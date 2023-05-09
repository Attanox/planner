<?php

namespace App\Eloquent\Logs;

use Illuminate\Database\Eloquent\Model;

class LogUserProject extends Model
{
    protected $table = 'log_user_project';
    const UPDATED_AT = null;

    protected $fillable = ['user_id', 'user_project_id', 'status'];

    public function user() {
        return $this->belongsTo('App\Eloquent\User');
    }

    public function project() {
        return $this->belongsTo('App\Eloquent\Projects\Project');
    }
}
