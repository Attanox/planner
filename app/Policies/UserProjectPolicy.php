<?php

namespace App\Policies;

use App\Eloquent\User;
use App\Eloquent\Projects\UserProject;
use Illuminate\Auth\Access\HandlesAuthorization;

class UserProjectPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can update the user project.
     *
     * @param  \App\Eloquent\User  $user
     * @param  \App\UserProject  $userProject
     * @return mixed
     */
    public function update(User $user, UserProject $userProject)
    {
        $project = $userProject->project;
        return $user->can('update', $project);
    }
}
