<?php

namespace App\Observers;

use App\Eloquent\Projects\Project;
use App\Eloquent\Logs\LogProject;

use Illuminate\Support\Facades\Auth;

class ProjectObserver
{
    /**
     * Handle the project "created" event.
     *
     * @param  \App\Project  $project
     * @return void
     */
    public function created(Project $project)
    {
        $user = Auth::user();

        // Factory creates
        if ($user === null) {
            return;
        }

        LogProject::create([
            'project_id' => $project->id,
            'user_id' => $user->id
        ]);
    }

    /**
     * Handle the project "updated" event.
     *
     * @param  \App\Project  $project
     * @return void
     */
    public function updated(Project $project)
    {
        $user = Auth::user();

        // Factory creates
        if ($user === null) {
            return;
        }

        $status = 2;

        if ($project->trash) {
             $status = 3;
        }

        LogProject::create([
            'status' => $status,
            'project_id' => $project->id,
            'user_id' => $user->id
        ]);
    }
}
