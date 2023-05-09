<?php

namespace App\Eloquent\Results;

use Illuminate\Database\Eloquent\Model;
use App\Eloquent\User;

class Result extends Model
{
    protected $table = 'results';
    public $timestamps = false;

    protected $fillable = ['title', 'topic', 'prerequisity', 'author', 'status', 'comment', 'category_id', 'type_id', 'result_category_id', 'date_begin', 'date_end', 'trash'];

    public function author()
    {
        return $this->belongsTo('App\Eloquent\User', 'author');
    }

    public function coauthors()
    {
        return $this->hasMany('App\Eloquent\Results\CoAuthor');
    }

    public function users()
    {
        return $this->hasMany('App\Eloquent\Results\UserResult');
    }

    public function phases()
    {
        return $this->hasMany('App\Eloquent\Results\Phase');
    }

    public function resultCategory()
    {
        return $this->belongsTo('App\Eloquent\Results\ResultCategory');
    }

    public function type()
    {
        return $this->belongsTo('App\Eloquent\Results\Type');
    }

    public function projects()
    {
        return $this->hasMany('App\Eloquent\Results\ResultProject');
    }

    public function tags()
    {
        return $this->belongsToMany('App\Eloquent\Results\Tag');
    }

    /**
     * For lock result when there are relations
     */
    public function hasRelations()
    {
        $phases = $this->phases->reject(function ($phase) {
            return ! $phase->users->first();
        });

        return $this->users->first() || $this->coauthors->first() || $phases->first();
    }

    /**
     * Find user in user-results
     */
    public function inUserResults(User $user)
    {
        $userResults = $this->users->reject(function ($userResult) use ($user) {
            return $userResult->user->id !== $user->id;
        });

        return $userResults->first() !== null;
    }

    /**
     * Find user in involved-users
     */
    public function inPhases(User $user)
    {
        $phases = $this->phases->reject(function ($phase) use ($user) {
            $involvedUsers = $phase->users->reject(function ($involvedUser) use ($user) {
                return $involvedUser->user->id !== $user->id;
            }
            );

            return $involvedUsers->first() === null;
        });

        return $phases->first() !== null;
    }

    public function inCoAuthors(User $user)
    {
        $coAuthors = $this->coauthors->reject(function ($coAuthor) use ($user) {
            return $coAuthor->user->id !== $user->id;
        });

        return $coAuthors->first() !== null;
    }

    public function isAuthor(User $user)
    {
        return $this->author()->first()->id === $user->id;
    }

    public function inRelation(User $user)
    {
        return $this->inUserResults($user) ||
            $this->isAuthor($user) ||
            $this->inPhases($user) ||
            $this->inCoAuthors($user);
    }
}
