<?php

namespace App\Observers;

use App\Eloquent\Results\ResultProject;
use Illuminate\Support\Facades\Auth;

use App\Eloquent\Logs\LogResult;

class ResultProjectObserver
{
    private function logging(ResultProject $resultProject, $status)
    {

        $user = Auth::user();

        // Factory creates
        if ($user === null) {
            return;
        }

        LogResult::create([
            'status' => $status,
            'result_id' => $resultProject->result->id,
            'user_id' => $user->id
        ]);
    }

    /**
     * Handle the result project "created" event.
     *
     * @param  ResultProject  $resultProject
     * @return void
     */
    public function created(ResultProject $resultProject)
    {
        $this->logging($resultProject, 7);
    }

    /**
     * Handle the result project "deleted" event.
     *
     * @param  ResultProject  $resultProject
     * @return void
     */
    public function deleted(ResultProject $resultProject)
    {
        $user = Auth::user();

        // Factory creates
        if ($user === null) {
            return;
        }

        LogResult::where('result_id', '=', $resultProject->result->id)->delete();
    }
}
