<?php

namespace App\Eloquent\Projects;

use App\Eloquent\Results\Phase;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $table = 'projects';
    public $timestamps = false;

    protected $fillable = ['name', 'date_begin', 'date_end', 'projects_color_set_id', 'code', 'short_name', 'solver', 'trash'];

    public function color()
    {
        return $this->belongsTo('App\Eloquent\Projects\ProjectColor', 'projects_color_set_id');
    }
    public function solver()
    {
        return $this->belongsTo('App\Eloquent\User', 'solver');
    }

    public function milestones()
    {
        return $this->hasMany('App\Eloquent\Projects\Milestone');
    }

    public function users()
    {
        return $this->hasMany('App\Eloquent\Projects\UserProject');
    }

    public function results()
    {
        return $this->hasMany('App\Eloquent\Results\ResultProject');
    }

    public function phases()
    {
        return $this->hasManyThrough('App\Eloquent\Results\Phase', 'App\Eloquent\Results\Result');
    }
}
