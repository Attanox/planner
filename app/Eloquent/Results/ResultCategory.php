<?php

namespace App\Eloquent\Results;

use Illuminate\Database\Eloquent\Model;

class ResultCategory extends Model
{
    protected $table = 'result_categories';
    public $timestamps = false;

    protected $fillable = ['url', 'acronym', 'note', 'trash', 'type', 'rank_id'];

    public function rank()
    {
        return $this->belongsTo('App\Eloquent\Results\Rank');
    }

    public function type()
    {
        return $this->belongsTo('App\Eloquent\Results\Type');
    }

    public function results()
    {
        return $this->hasMany('App\Eloquent\Results\Result');
    }
}
