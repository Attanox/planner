<?php

namespace App\Eloquent;

use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    protected $table = 'roles';
    public $timestamps = false;

    protected $fillable = ['user_id'];

    public function user() {
        return $this->belongsTo('App\Eloquent\User');
    }
}
