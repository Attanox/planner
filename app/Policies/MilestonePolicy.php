<?php

namespace App\Policies;

use App\Eloquent\User;
use App\Eloquent\Projects\Milestone;
use Illuminate\Auth\Access\HandlesAuthorization;

class MilestonePolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can update the milestone.
     *
     * @param  \App\Eloquent\User  $user
     * @param  \App\Milestone  $milestone
     * @return mixed
     */
    public function update(User $user, Milestone $milestone)
    {
        $project = $milestone->project;
        return $user->can('update', $project);
    }
}
