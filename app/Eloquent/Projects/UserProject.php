<?php

namespace App\Eloquent\Projects;

use Illuminate\Database\Eloquent\Model;

class UserProject extends Model
{
    protected $table = 'user_project';
    public $timestamps = false;

    protected $fillable = ['occupancy', 'user_id', 'project_id', 'trash'];

    public function user() {
        return $this->belongsTo('App\Eloquent\User');
    }

    public function project() {
        return $this->belongsTo('App\Eloquent\Projects\Project');
    }

    public function role() {
        return $this->hasOne('App\Eloquent\Projects\UserProjectRole');
    }
}
