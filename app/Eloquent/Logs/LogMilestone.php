<?php

namespace App\Eloquent\Logs;

use Illuminate\Database\Eloquent\Model;

class LogMilestone extends Model
{
    protected $table = 'log_milestones';
    const UPDATED_AT = null;

    protected $fillable = ['user_id', 'milestone_id', 'status'];

    public function user() {
        return $this->belongsTo('App\Eloquent\User');
    }

    public function milestone() {
        return $this->belongsTo('App\Eloquent\Projects\Milestone');
    }
}
