<?php

namespace App\Eloquent\Results;

use Illuminate\Database\Eloquent\Model;

class CoAuthor extends Model
{
    protected $table = 'coauthors';
    const UPDATED_AT = null;

    protected $fillable = ['result_id', 'user_id'];

    public function user() {
        return $this->belongsTo('App\Eloquent\User');
    }

    public function result() {
        return $this->belongsTo('App\Eloquent\Results\Result');
    }
}
