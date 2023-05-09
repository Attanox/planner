<?php

namespace App\GraphQL\Mutations;

use GraphQL\Type\Definition\ResolveInfo;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

use App\Eloquent\Results\UserResult;
use Illuminate\Support\Facades\Auth;

use App\Exceptions\GraphQLError;

class RemoveUserResultMutator
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
        $result_id = $args['result_id'];
        $user_id = $args['user_id'];

        $query = UserResult::query();
        $query->where('result_id', $result_id)->where('user_id', $user_id);

        $userResult = $query->get();
        $user = Auth::user();

        foreach ($userResult as $ur) {
            $result = $ur->result;

            if (!$user->isAdmin() &&
            !$user->isProjectAdmin($result) &&
            !$user->isAuthor($result) &&
            !($user->id === $userResult->user->id)) {
                throw new GraphQLError(
                    'Cannot delete user-result of this result.',
                    'Your account doesn\'t have permission for this operation.'
                );
            }
            $ur->delete();

        }



        return true;
    }
}
