<?php

namespace App\Observers;

use App\Eloquent\Results\Result;
use App\Eloquent\Logs\LogResult;

use Illuminate\Support\Facades\Auth;

class ResultObserver
{
    /**
     * Handle the result "created" event.
     *
     * @param  \App\Eloquent\Results\Result  $result
     * @return void
     */
    public function created(Result $result)
    {
        $user = Auth::user();

        // Factory creates
        if ($user === null) {
            return;
        }

        LogResult::create([
            'result_id' => $result->id,
            'user_id' => $user->id
        ]);
    }

    /**
     * Handle the result "updated" event.
     *
     * @param  \App\Eloquent\Results\Result  $result
     * @return void
     */
    public function updated(Result $result)
    {
        $user = Auth::user();

        // Factory creates
        if ($user === null) {
            return;
        }

        $status = 2;

        if ($result->trash) {
            $status = 3;
        }

        LogResult::create([
            'status' => $status,
            'result_id' => $result->id,
            'user_id' => $user->id
        ]);
    }

    /**
     * Listen to the Result deleting event.
     *
     * @param  Result  $result
     * @return void
     */
    public function deleting(Result $result)
    {
        $user = Auth::user();

        // Factory creates
        if ($user === null) {
            return;
        }

        LogResult::where('result_id', '=', $result->id)->delete();
    }
}
