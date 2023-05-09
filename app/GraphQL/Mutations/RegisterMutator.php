<?php

namespace App\GraphQL\Mutations;

use App\Exceptions\GraphQLError;
use GraphQL\Type\Definition\ResolveInfo;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

use Illuminate\Support\Facades\Auth;
use App\Eloquent\User;
use Illuminate\Support\Facades\Log;


class RegisterMutator
{
    /**
     * Return a boolean accordingly
     *
     * @param  null  $rootValue Usually contains the result returned from the parent field. In this case, it is always `null`.
     * @param  mixed[]  $args The arguments that were passed into the field.
     * @param  \Nuwave\Lighthouse\Support\Contracts\GraphQLContext  $context Arbitrary data that is shared between all fields of a single query.
     * @param  \GraphQL\Type\Definition\ResolveInfo  $resolveInfo Information about the query itself, such as the execution state, the field name, path to the field from the root, and more.
     * @return User
     */
    public function __invoke($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {
        $result = User::create([
            'first_name' => $args['first_name'],
            'last_name' => $args['last_name'],
            'name' => $args['last_name'] . ' ' . $args['first_name'],
            'status' => $args['status'],
            'email' => $args['email'],
            'password' => Hash::make($args['password']),
            'block' => false,
        ]);

        $result->forceFill([
            'email_verified_at' => now(),
            'remember_token' => Str::random(10),
        ])->save();

        return $result;
    }
}
