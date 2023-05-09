<?php

namespace App\GraphQL\Mutations;

use GraphQL\Type\Definition\ResolveInfo;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

use App\Eloquent\Results\InvolvedUser;
use Illuminate\Support\Facades\Auth;

use App\Exceptions\GraphQLError;

class UpdateInvolvedUserMutator
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
        $involvedUser = InvolvedUser::where('id', $args['id'])->firstOrFail();
        $user = Auth::user();
        $result = $involvedUser->phase->result;

        if (!$user->isAdmin() &&
            !$user->isProjectAdmin($result) &&
            !$user->isAuthor($result) &&
            !($user->id === $involvedUser->user->id)) {
            throw new GraphQLError(
                'Cannot update involved-user of this phase.',
                'Your account doesn\'t have permission for this operation.'
            );
        }
        
        $involvedUser->update([
            'note' => $args['note']
        ]);

        return $involvedUser;
    }
}
