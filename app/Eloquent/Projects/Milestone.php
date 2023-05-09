<?php

namespace App\Eloquent\Projects;

use Illuminate\Database\Eloquent\Model;

class Milestone extends Model
{
    protected $table = 'milestones';
    public $timestamps = false;

    protected $fillable = ['project_id', 'name', 'date', 'trash', 'description'];

    public function project()
    {
        return $this->belongsTo('App\Eloquent\Projects\Project');
    }
}
