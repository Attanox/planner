<?php

namespace App\GraphQL\Mutations;

use App\Eloquent\Projects\Project;
use App\Eloquent\Projects\UserProject;
use GraphQL\Type\Definition\ResolveInfo;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

use App\Eloquent\Results\Result;
use App\Eloquent\Results\ResultProject;
use App\Eloquent\User;

class FilterTimelineProjectsMutator
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
        $search_text = $args['search_text'];

        if (empty($search_text)) {
            return [];
        }


        $projectsByName = Project::where('name', 'LIKE', '%' . $search_text . '%')
            ->orWhere('short_name', 'LIKE', '%' . $search_text . '%')
            ->get();

        $usersByName = Project::whereHas('users', function ($query) use ($search_text) {
            $query->wherePivot('name', 'LIKE', '%' . $search_text . '%');
        })->get();

        $resultsByTitle = Project::whereHas('results', function ($query) use ($search_text) {
            $query->wherePivot('title', 'LIKE', '%' . $search_text . '%');
        })->get();

        $phasesByNameTemp = ResultProject::join('results', 'results.id', '=', 'result_project.result_id')
            ->join('projects', 'projects.id', '=', 'result_project.project_id')
            ->join('phases', 'phases.result_id', '=', 'results.id')
            ->where('phases.name', 'LIKE', '%' . $search_text . '%')
            ->select('projects.id')
            ->get();
        $projectIds = [];
        foreach ($phasesByNameTemp as $project) {
            $projectIds[] = $project->id;
        }
        $phasesByName = Project::whereIn('id', $projectIds)->get();

        $allItems = new \Illuminate\Database\Eloquent\Collection;
        $allItems = $allItems->merge($projectsByName);
        $allItems = $allItems->merge($usersByName);
        $allItems = $allItems->merge($resultsByTitle);
        $allItems = $allItems->merge($phasesByName);

        return $allItems;
    }
}
