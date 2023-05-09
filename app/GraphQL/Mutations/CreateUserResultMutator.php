<?php

namespace App\GraphQL\Mutations;

use GraphQL\Type\Definition\ResolveInfo;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

use App\Exceptions\GraphQLError;

use App\Eloquent\Results\UserResult;
use App\Eloquent\User;
use App\Eloquent\Results\Result;

class CreateUserResultMutator
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
        $result = Result::where('id', $args['result_id'])->firstOrFail();
        $user = User::where('id', $args['user_id'])->firstOrFail();

        if (!$user->inProject($result)) {
            throw new GraphQLError(
                'Wrong user_id in user-result relation.',
                'This user cannot be added to this result.'
            );
        }

        return UserResult::create([
            'result_id' => $result->id,
            'user_id' => $user->id,
            'date_begin' => $args['date_begin'],
            'date_end' => $args['date_end']
        ]);
    }
}
