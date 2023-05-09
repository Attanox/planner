<?php

namespace App\Eloquent\Results;

use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    protected $table = 'tags';

    protected $fillable = ['name'];

    public function results()
    {
        return $this->belongsToMany('App\Eloquent\Results\Result');
    }
}
