<?php

namespace App\Eloquent\Results;

use Illuminate\Database\Eloquent\Model;

class Type extends Model
{
    protected $table = 'types';

    protected $fillable = ['name', 'description'];

    public function resultCategories()
    {
        return $this->hasMany('App\Eloquent\Results\ResultCategory');
    }
}
