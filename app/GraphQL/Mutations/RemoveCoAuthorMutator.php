<?php

namespace App\GraphQL\Mutations;

use GraphQL\Type\Definition\ResolveInfo;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

use Illuminate\Support\Facades\Auth;
use App\Exceptions\GraphQLError;

use App\Eloquent\Results\CoAuthor;

class RemoveCoAuthorMutator
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
        $id = $args['id'];
        $coAuthor = CoAuthor::where('user_id', $id)->firstOrFail();
        $user = Auth::user();

        /**
         * Policy for admin, project-admin, author and co-author
         */
        $result = $coAuthor->result;
        if (!$user->can('update', $result)) {
            throw new GraphQLError(
                'Cannot remove coAuthor.',
                'Given account id doesn\'t have permission for this operation.'
            );
        }

        $coAuthor->delete();
        return $coAuthor;
    }
}
