<?php

namespace App\Observers;

use App\Eloquent\Results\Phase;
use Illuminate\Support\Facades\Auth;

use App\Eloquent\Logs\LogResult;
use App\Eloquent\Results\Result;

class PhaseObserver
{
    private function logging(Phase $phase, $status)
    {

        $user = Auth::user();

        // Factory creates
        if ($user === null) {
            return;
        }

        LogResult::create([
            'status' => $status,
            'result_id' => $phase->result_id,
            'user_id' => $user->id
        ]);
    }

    /**
     * Handle the phase "created" event.
     *
     * @param  \App\Eloquent\Results\Phase  $phase
     * @return void
     */
    public function created(Phase $phase)
    {
        $this->updateResultStatus($phase);

        $this->logging($phase, 4);
    }

    /**
     * update the Result's status
     *
     * @param  \App\Eloquent\Results\Phase  $phase
     * @return void
     */
    private function updateResultStatus(Phase $phase)
    {
        $result = Result::find($phase->result_id);


        if (! $result) {
            return;
        }

        if ($phase->date_begin > now()) {
            $result->status = 'scheduled';
        }

        if ($phase->date_end < now()) {
            $result->status = 'done';
        }

        if ($phase->date_begin <= now() && $phase->date_end >= now()) {
            $result->status = 'in_progress';
        }

        $result->save();
    }

    /**
     * Handle the phase "updated" event.
     *
     * @param  \App\Eloquent\Results\Phase  $phase
     * @return void
     */
    public function updated(Phase $phase)
    {
        $this->logging($phase, 5);
    }

    /**
     * Handle the phase "deleted" event.
     *
     * @param  \App\Eloquent\Results\Phase  $phase
     * @return void
     */
    public function deleted(Phase $phase)
    {
        $this->logging($phase, 6);
    }
}
