<?php

namespace App\Eloquent\Results;

use Illuminate\Database\Eloquent\Model;

class InvolvedUser extends Model
{
    protected $table = 'involved_users';
    const UPDATED_AT = null;

    protected $fillable = ['phase_id', 'user_id', 'note'];

    public function phase() {
        return $this->belongsTo('App\Eloquent\Results\Phase');
    }

    public function user() {
        return $this->belongsTo('App\Eloquent\User');
    }
}
