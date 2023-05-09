<?php

namespace App\Policies;

use App\Eloquent\User;
use App\Eloquent\Projects\Project;
use Illuminate\Auth\Access\HandlesAuthorization;

class ProjectPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can update the project.
     *
     * @param  \App\Eloquent\User  $user
     * @param  \App\Project  $project
     * @return mixed
     */
    public function update(User $user, Project $project)
    {
        return  $user->isAdmin() ||
                $user->projectAdmin($project);
    }
}
