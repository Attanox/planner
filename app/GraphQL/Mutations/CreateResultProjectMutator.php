<?php

namespace App\GraphQL\Mutations;

use GraphQL\Type\Definition\ResolveInfo;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

use Illuminate\Support\Facades\Auth;
use App\Eloquent\Results\Result;
use App\Eloquent\Projects\Project;
use App\Eloquent\Results\ResultProject;

use App\Exceptions\GraphQLError;

class CreateResultProjectMutator
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
        $result = Result::where('id', $args['result_id'])->firstOrFail();
        $project = Project::where('id', $args['project_id'])->firstOrFail();

        if (!$user->isAdmin() &&
            !$user->isProjectAdmin($result) &&
            !$user->isAuthor($result)) {
            throw new GraphQLError(
                'Cannot add this project to the result.',
                'Your account doesn\'t have permission for this operation.'
            );
        }

        if ($user->isAuthor($result)) {
            $inProject = $user->projects->where('project_id', $project->id)->first();
            
            if ($inProject === null || $inProject->trash) {
                throw new GraphQLError(
                    'Cannot add this project to the result.',
                    'Your account doesn\'t have permission for this operation.'
                );
            }
        }

        if ($result->hasRelations()) {
            throw new GraphQLError(
                'Result is locked for this kind of operation.',
                'There are user connections to this account. Project cannot be added.'
            );
        }

        return ResultProject::create([
            'result_id' => $result->id,
            'project_id' => $project->id
        ]);
    }
}
