<?php

namespace App\Eloquent\Results;

use Illuminate\Database\Eloquent\Model;

class Rank extends Model
{
    protected $table = 'ranks';

    protected $fillable = ['name', 'note'];

    public function resultCategories()
    {
        return $this->hasMany('App\Eloquent\Results\ResultCategory');
    }
}
