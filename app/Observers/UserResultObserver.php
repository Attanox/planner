<?php

namespace App\Observers;

use App\Eloquent\Results\UserResult;
use Illuminate\Support\Facades\Auth;

use App\Eloquent\Logs\LogUserResult;

class UserResultObserver
{
    private function logging(UserResult $userResult, $status) {

        $user = Auth::user();

        // Factory creates
        if ($user === null) {
            return;
        }

        LogUserResult::create([
            'result_id' => $userResult->result->id,
            'user_id' => $user->id,
            'added_user_id' => $userResult->user->id,
            'status' => $status
        ]);
    }

    /**
     * Handle the user result "created" event.
     *
     * @param  \App\UserResult  $userResult
     * @return void
     */
    public function created(UserResult $userResult)
    {
        $this->logging($userResult, 6);
    }

    /**
     * Handle the user result "updated" event.
     *
     * @param  \App\UserResult  $userResult
     * @return void
     */
    public function updated(UserResult $userResult)
    {
        $this->logging($userResult, 7);
    }

    /**
     * Handle the user result "deleted" event.
     *
     * @param  \App\UserResult  $userResult
     * @return void
     */
    public function deleted(UserResult $userResult)
    {
        $this->logging($userResult, 8);
    }
}
