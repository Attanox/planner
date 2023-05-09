<?php

namespace App\GraphQL\Mutations;

use GraphQL\Type\Definition\ResolveInfo;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

use Illuminate\Support\Facades\Auth;
use App\Eloquent\Results\Result;

use App\Exceptions\GraphQLError;

use App\Eloquent\Logs\LogUserResult;
use App\Eloquent\User;

class UpdateAuthorMutator
{
    /**
     * Return a value for the field.
     *
     * @param  null  $rootValue Usually contains the result returned from the parent field. In this case, it is always `null`.
     * @param  mixed[]  $args The arguments that were passed into the field.
     * @param  \Nuwave\Lighthouse\Support\Contracts\GraphQLContext  $context Arbitrary data that is shared between all fields of a single query.
     * @param  \GraphQL\Type\Definition\ResolveInfo  $resolveInfo Information about the query itself, such as the execution state, the field name, path to the field from the root, and more.
     * @return mixed
     */
    public function __invoke($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {
        $result = Result::where('id', $args['id'])->firstOrFail();
        $user = Auth::user();

        $new = User::where('id', $args['author'])->firstOrFail();

        // Only admin, project-admin and author
        if (!$user->isAdmin() &&
            !$user->isProjetcAdmin($result) &&
            !$user->isAuthor($result)) {
                throw new GraphQLError(
                    'Cannot change author of this result.',
                    'Given account id doesn\'t have permission for this operation.'
                );
            }

        // Check if user is in same project
        if (!$new->inProject($result)) {
            throw new GraphQLError(
                'Cannot change to this author.',
                'Given account id doesn\'t have permission for this project.'
            );
        }

        // Added as author
        LogUserResult::create([
            'result_id' => $result->id,
            'user_id' => $user->id,
            'added_user_id' => $new->id,
            'status' => 4
        ]);

        // Removed as author
        LogUserResult::create([
            'result_id' => $result->id,
            'user_id' => $user->id,
            'added_user_id' => $result->author,
            'status' => 5
        ]);

        $result->update([
            'author' => $new->id
        ]);

        return $result;
    }
}
