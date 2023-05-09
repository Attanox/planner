<?php

namespace App\Observers;

use App\Eloquent\Results\CoAuthor;
use Illuminate\Support\Facades\Auth;

use App\Eloquent\Logs\LogUserResult;

class CoAuthorObserver
{
    private function logging(CoAuthor $coAuthor, $status) {

        $user = Auth::user();

        // Factory creates
        if ($user === null) {
            return;
        }

        LogUserResult::create([
            'result_id' => $coAuthor->result->id,
            'user_id' => $user->id,
            'added_user_id' => $coAuthor->user->id,
            'status' => $status
        ]);
    }
    /**
     * Handle the co author "created" event.
     *
     * @param  \App\CoAuthor  $coAuthor
     * @return void
     */
    public function created(CoAuthor $coAuthor)
    {
        $this->logging($coAuthor, 9);
    }

    /**
     * Handle the co author "deleted" event.
     *
     * @param  \App\CoAuthor  $coAuthor
     * @return void
     */
    public function deleted(CoAuthor $coAuthor)
    {
        $this->logging($coAuthor, 10);
    }
}
