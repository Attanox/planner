<?php

namespace App\Observers;

use App\Eloquent\Projects\Milestone;
use App\Eloquent\Logs\LogMilestone;

use Illuminate\Support\Facades\Auth;

class MilestoneObserver
{
    /**
     * Handle the milestone "created" event.
     *
     * @param  \App\Milestone  $milestone
     * @return void
     */
    public function created(Milestone $milestone)
    {
        $user = Auth::user();

        // Factory creates
        if ($user === null) {
            return;
        }

        LogMilestone::create([
            'milestone_id' => $milestone->id,
            'user_id' => $user->id
        ]);
    }

    /**
     * Handle the milestone "updated" event.
     *
     * @param  \App\Milestone  $milestone
     * @return void
     */
    public function updated(Milestone $milestone)
    {
        $user = Auth::user();

        // Factory creates
        if ($user === null) {
            return;
        }

        $status = 2;

        if ($milestone->trash) {
             $status = 3;
        }

        LogMilestone::create([
            'status' => $status,
            'milestone_id' => $milestone->id,
            'user_id' => $user->id
        ]);
    }
}
