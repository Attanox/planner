<?php

namespace App\GraphQL\Queries;

use App\Eloquent\Results\Result;

class ResultsByProjectAndUser
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function __invoke($_, array $args)
    {
        $project_ids = $args['project_ids'];
        $user_ids = $args['user_ids'];

        $query = Result::query();

        if (count($project_ids) > 0) {
            $query->whereHas('projects', function ($query) use ($project_ids) {
                $query->whereIn('id', $project_ids);
            });
        }

        if (count($user_ids) > 0) {
            $query->whereHas('users', function ($query) use ($user_ids) {
                $query->whereIn('id', $user_ids);
            });
        }

        return $query->get();
    }
}
