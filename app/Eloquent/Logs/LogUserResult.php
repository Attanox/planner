<?php

namespace App\Eloquent\Logs;

use Illuminate\Database\Eloquent\Model;

class LogUserResult extends Model
{
    protected $table = 'log_user_result';
    const UPDATED_AT = null;

    protected $fillable = ['user_id', 'result_id', 'status', 'added_user_id'];

    public function user() {
        return $this->belongsTo('App\Eloquent\User');
    }

    public function addedUser() {
        return $this->belongsTo('App\Eloquent\User', 'added_user_id');
    }

    public function result() {
        return $this->belongsTo('App\Eloquent\Results\Result');
    }
}
