<?php

namespace App\Observers;

use App\Eloquent\Results\InvolvedUser;
use Illuminate\Support\Facades\Auth;

use App\Eloquent\Logs\LogUserResult;

class InvolvedUserObserver
{
    private function logging(InvolvedUser $involvedUser, $status) {

        $user = Auth::user();

        // Factory creates
        if ($user === null) {
            return;
        }

        LogUserResult::create([
            'result_id' => $involvedUser->phase->result->id,
            'user_id' => $user->id,
            'added_user_id' => $involvedUser->user->id,
            'status' => $status
        ]);
    }

    /**
     * Handle the involved user "created" event.
     *
     * @param  \App\InvolvedUser  $involvedUser
     * @return void
     */
    public function created(InvolvedUser $involvedUser)
    {
        $this->logging($involvedUser, 1);
    }

    /**
     * Handle the involved user "updated" event.
     *
     * @param  \App\InvolvedUser  $involvedUser
     * @return void
     */
    public function updated(InvolvedUser $involvedUser)
    {
        $this->logging($involvedUser, 2);
    }

    /**
     * Handle the involved user "deleted" event.
     *
     * @param  \App\InvolvedUser  $involvedUser
     * @return void
     */
    public function deleted(InvolvedUser $involvedUser)
    {
        $this->logging($involvedUser, 3);
    }
}
