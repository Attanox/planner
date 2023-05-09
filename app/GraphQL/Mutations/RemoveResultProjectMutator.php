<?php

namespace App\GraphQL\Mutations;

use GraphQL\Type\Definition\ResolveInfo;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

use Illuminate\Support\Facades\Auth;
use App\Eloquent\Results\ResultProject;

use App\Exceptions\GraphQLError;

class RemoveResultProjectMutator
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
        $user = Auth::user();
        $resultProject = ResultProject::where('id', $args['id'])->firstOrFail();

        if (!$user->isAdmin() &&
            !$user->isProjectAdmin($result) &&
            !$user->isAuthor($result)) {
            throw new GraphQLError(
                'Cannot remove this project from the result.',
                'Your account doesn\'t have permission for this operation.'
            );
        }

        if ($resultProject->result->hasRelations()) {
            throw new GraphQLError(
                'Result is locked for this kind of operation.',
                'There are user connections to this account. Project cannot be daleted.'
            );
        }

        $resultProject->delete();

        return true;
    }
}
