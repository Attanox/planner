<?php

namespace App\Eloquent\Projects;

use Illuminate\Database\Eloquent\Model;

class ProjectColor extends Model
{
    protected $table = 'projects_color_set';
    protected $fillable = ['hex'];

    public function projects() {
        return $this->hasMany('App\Eloquent\Projects\Project', 'projects_color_set_id');
    }
}
