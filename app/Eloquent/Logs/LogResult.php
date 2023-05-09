<?php

namespace App\Eloquent\Logs;

use Illuminate\Database\Eloquent\Model;

class LogResult extends Model
{
    protected $table = 'log_results';
    const UPDATED_AT = null;

    protected $fillable = ['user_id', 'result_id', 'status'];

    public function user() {
        return $this->belongsTo('App\Eloquent\User');
    }

    public function result() {
        return $this->belongsTo('App\Eloquent\Results\Result');
    }
}
