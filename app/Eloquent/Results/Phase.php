<?php

namespace App\Eloquent\Results;

use Illuminate\Database\Eloquent\Model;

class Phase extends Model
{
    protected $table = 'phases';
    protected $fillable = ['date_begin', 'date_end', 'result_id', 'description', 'name'];

    public function result() {
        return $this->belongsTo('App\Eloquent\Results\Result');
    }

    public function users() {
        return $this->hasMany('App\Eloquent\Results\InvolvedUser');
    }
}
