<?php

namespace App\GraphQL\Queries;

use App\Eloquent\Projects\Project;
use App\Exceptions\GraphQLError;
use GraphQL\Type\Definition\ResolveInfo;
use Illuminate\Support\Facades\Auth;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

class Projects
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


    }

    public function untrashed()
    {
        $result = Project::cursor()->filter(function ($project) {
            return $project->trash == false;
        });

        return $result;
    }

    public function currentUserProjects()
    {
        if (! (Auth::check())) {
            throw new GraphQLError(
                'Cannot query data.',
                'You have to be authenticated for this operation.'
            );
        }

        $user = Auth::user();
        $query = Project::query();

        $query->whereHas('users', function ($query) use ($user) {
            $query->where('user_id', $user->getAuthIdentifier());
        });

        return $query->get();
    }
}
