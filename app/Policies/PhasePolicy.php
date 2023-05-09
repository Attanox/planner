<?php

namespace App\Policies;

use App\Eloquent\User;
use App\Eloquent\Results\Phase;
use Illuminate\Auth\Access\HandlesAuthorization;

class PhasePolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can update the phase.
     *
     * @param  \App\Eloquent\User  $user
     * @param  \App\Phase  $phase
     * @return mixed
     */
    public function update(User $user, Phase $phase)
    {
        $result = $phase->result;
        return $user->can('update', $result);
    }
}
