<?php

namespace App\Observers;

use App\Eloquent\Projects\UserProject;
use App\Eloquent\Logs\LogUserProject;

use Illuminate\Support\Facades\Auth;

class UserProjectObserver
{
    /**
     * Handle the user project "created" event.
     *
     * @param  \App\UserProject  $userProject
     * @return void
     */
    public function created(UserProject $userProject)
    {
        $user = Auth::user();

        // Factory creates
        if ($user === null) {
            return;
        }

        LogUserProject::create([
            'user_project_id' => $userProject->id,
            'user_id' => $user->id
        ]);
    }

    /**
     * Handle the user project "updated" event.
     *
     * @param  \App\UserProject  $userProject
     * @return void
     */
    public function updated(UserProject $userProject)
    {
        $user = Auth::user();

        // Factory creates
        if ($user === null) {
            return;
        }

        $status = 2;

        if ($userProject->trash) {
             $status = 3;
        }

        LogUserProject::create([
            'status' => $status,
            'user_project_id' => $userProject->id,
            'user_id' => $user->id
        ]);
    }
}
