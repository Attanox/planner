<?php

namespace App\GraphQL\Mutations;

use App\Exceptions\GraphQLError;
use GraphQL\Type\Definition\ResolveInfo;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

use Illuminate\Support\Arr;
use Illuminate\Support\Str;

class AuthMutator
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
        $credentials = Arr::only($args, ['email', 'password']);
        $stay = Arr::only($args, ['stay']);

        if (Auth::attempt($credentials)) {

            /* Get user model */
            $user = Auth::user();

            if ($user->isBlocked()) {
                throw new GraphQLError(
                    'Cannot login.',
                    'Your account has been blocked.'
                );
            }

            /* Generate token */
            $token = Str::random(60);

            /*
            Set token to database
            Must be enabled in config as hash = true
            */
            $user->forceFill([
                'api_token' => hash('sha256', $token),
                'api_token_date' => $stay['stay'] ? null : Carbon::now()->toDateTimeString(),
            ])->save();

            return $token;
        }

        return null;
    }

    public function resetPassword($rootValue, array $args) {
        $old_password = $args['oldPassword'];
        $new_password = $args['newPassword'];

        $user = Auth::user();
        if (password_verify($old_password, $user->password)) {
            $user->password = bcrypt($new_password);
            $user->save();
        } else {
            throw new GraphQLError(
                'Cannot reset password.',
                'Old password does not match.'
            );
        }

        return $user;
    }
}
