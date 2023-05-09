<?php

namespace App\Observers;

use App\Eloquent\Results\ResultCategory;
use App\Eloquent\Logs\LogResultCategory;

use Illuminate\Support\Facades\Auth;

class ResultCategoryObserver
{

    /**
     * Handle the result category "created" event.
     *
     * @param  \App\ResultCategory  $resultCategory
     * @return void
     */
    public function created(ResultCategory $resultCategory)
    {
        $user = Auth::user();

        // Factory creates
        if ($user === null) {
            return;
        }

        LogResultCategory::create([
            'result_category_id' => $resultCategory->id,
            'user_id' => $user->id
        ]);
    }

    /**
     * Handle the result category "updated" event.
     *
     * @param  \App\ResultCategory  $resultCategory
     * @return void
     */
    public function updated(ResultCategory $resultCategory)
    {
        $user = Auth::user();

        // Factory creates
        if ($user === null) {
            return;
        }

        $status = 2;

        if ($resultCategory->trash) {
             $status = 3;
        }

        LogResultCategory::create([
            'status' => $status,
            'result_category_id' => $resultCategory->id,
            'user_id' => $user->id
        ]);
    }
}
