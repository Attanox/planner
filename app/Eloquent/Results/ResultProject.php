<?php

namespace App\Eloquent\Results;

use Illuminate\Database\Eloquent\Model;

class ResultProject extends Model
{
    protected $table = 'result_project';
    const UPDATED_AT = null;

    protected $fillable = ['result_id', 'project_id'];

    public function result() {
        return $this->belongsTo('App\Eloquent\Results\Result');
    }

    public function project() {
        return $this->belongsTo('App\Eloquent\Projects\Project');
    }
}
