<?php

namespace App\Eloquent\Results;

use Illuminate\Database\Eloquent\Model;

class UserResult extends Model
{
    protected $table = 'user_result';
    const UPDATED_AT = null;

    protected $fillable = ['date_begin', 'date_end', 'result_id', 'user_id'];

    public function user() {
        return $this->belongsTo('App\Eloquent\User');
    }

    public function result() {
        return $this->belongsTo('App\Eloquent\Results\Result');
    }
}
