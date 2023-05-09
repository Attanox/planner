<?php

namespace App\Policies;

use App\Eloquent\User;
use App\Eloquent\Results\Result;
use App\Eloquent\Results\CoAuthor;

use Illuminate\Auth\Access\HandlesAuthorization;

class ResultPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can update the result.
     *
     * @param  \App\Eloquent\User  $user
     * @param  \App\Result  $result
     * @return mixed
     */
    public function update(User $user, Result $result)
    {
        // Only author, co-author, admin and project admin

        $isCoAuthor = $user->isCoAuthor($result);
        $isAuthor = $user->isAuthor($result);

        // Check if user is not trashed
        if ($isAuthor || $isCoAuthor) {
            $usersProjects = $user->projects
                ->where('trash', false)
                ->pluck('project_id')
                ->toArray();

            return $result->projects
                ->whereIn('project_id', $usersProjects)
                ->first() !== null;
        }

        return $user->isAdmin() || $user->isProjectAdmin($result);
    }
}
