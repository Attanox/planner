<?php

namespace App\Observers;

use App\Eloquent\Projects\UserProjectRole;
use App\Eloquent\Logs\LogUserProject;

use Illuminate\Support\Facades\Auth;

class UserProjectRoleObserver
{
    private function logging(UserProjectRole $userProjectRole, $status) {

        $user = Auth::user();

        // Factory creates
        if ($user === null) {
            return;
        }

        LogUserProject::create([
            'user_project_id' => $userProjectRole->userProject->project->id,
            'user_id' => $user->id,
            'status' => $status
        ]);
    }

    /**
     * Handle the user project role "created" event.
     *
     * @param  \App\UserProjectRole  $userProjectRole
     * @return void
     */
    public function created(UserProjectRole $userProjectRole)
    {
        $this->logging($userProjectRole, 4);
    }

    /**
     * Handle the user project role "deleted" event.
     *
     * @param  \App\UserProjectRole  $userProjectRole
     * @return void
     */
    public function deleted(UserProjectRole $userProjectRole)
    {
        $this->logging($userProjectRole, 5);
    }
}
