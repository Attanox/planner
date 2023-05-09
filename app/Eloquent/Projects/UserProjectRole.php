<?php

namespace App\Eloquent\Projects;

use Illuminate\Database\Eloquent\Model;

class UserProjectRole extends Model
{
    protected $table = 'user_project_role';
    public $timestamps = false;
    protected $fillable = ['user_project_id'];

    public function userProject() {
        return $this->belongsTo('App\Eloquent\Projects\UserProject');
    }
}
