<?php

namespace App\Eloquent\Logs;

use Illuminate\Database\Eloquent\Model;

class LogResultCategory extends Model
{
    protected $table = 'log_result_categories';
    const UPDATED_AT = null;

    protected $fillable = ['user_id', 'result_category_id', 'status'];

    public function user() {
        return $this->belongsTo('App\Eloquent\User');
    }

    public function resultCategory() {
        return $this->belongsTo('App\Eloquent\Results\ResultCategory');
    }
}
