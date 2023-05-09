<?php

namespace App\Eloquent;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

use App\Eloquent\Results\Result;
use App\Eloquent\Results\CoAuthor;
use App\Eloquent\Projects\Project;

use App\Exceptions\GraphQLError;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'block', 'first_name', 'last_name', 'status'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function author()
    {
        return $this->hasMany('App\Eloquent\Results\Result', 'author');
    }

    public function coauthor()
    {
        return $this->hasMany('App\Eloquent\Results\CoAuthor');
    }

    public function phases()
    {
        return $this->hasMany('App\Eloquent\Results\InvolvedUser');
    }

    public function projects()
    {
        return $this->hasMany('App\Eloquent\Projects\UserProject');
    }

    public function results()
    {
        return $this->hasMany('App\Eloquent\Results\UserResult');
    }

    public function role()
    {
        return $this->hasOne('App\Eloquent\Role');
    }

    public function isBlocked()
    {
        return $this->status === 'ALUMNI';
    }

    /**
     * If user is project admin for a result
     *
     * @param  App\Eloquent\Results\Result
     * @return boolean
     */
    public function isProjectAdmin(Result $result)
    {

        // Get projects of a result to array
        $projects = $result->projects()
            ->pluck('project_id')
            ->toArray();

        // Get same projects and filter those with admin role
        $user_projects = $this->projects
            ->where('trash', false)
            ->whereIn('project_id', $projects)
            ->reject(function ($userproject) {
                return $userproject->role === null;
            });

        return $user_projects->first() !== null;
    }

    /**
     * If user is project admin for a project
     *
     * @param  App\Eloquent\Projects\Project
     * @return boolean
     */
    public function projectAdmin(Project $project)
    {

        $user_project = $this->projects
            ->where('project_id', $project->id)
            ->first();

        if ($user_project == null) {
            return false;
        }

        return $user_project->role !== null;
    }

    /**
     * Is author of a result
     *
     * @param  App\Eloquent\Results\Result
     * @return boolean
     */
    public function isAuthor(Result $result)
    {
        return $this->id === $result->author;
    }

    /**
     * Is admin
     * @return boolean
     */
    public function isAdmin()
    {
        return $this->role !== null;
    }

    /**
     * Is coAuthor of a project
     *
     * @param  App\Eloquent\Results\Result
     * @return boolean
     */
    public function isCoAuthor(Result $result)
    {
        return CoAuthor::where('user_id', $this->id)
            ->where('result_id', $result->id)
            ->exists();
    }

    /**
     * In project of a result
     * This function is used to adding related users to results
     * It is necessery to have at least one related project to result
     *
     * @param  App\Eloquent\Results\Result
     * @return boolean
     */
    public function inProject(Result $result)
    {
        $projects = $result->projects()
            ->pluck('project_id')
            ->toArray();

        if (empty($projects)) {
            throw new GraphQLError(
                'Result has no related projects.',
                'For this operation is needed to have at least one related project.'
            );
        }

        return $this->projects()
            ->whereIn('project_id', $projects)
            ->exists();
    }

    /**
     * In relation with result in project (result is not trashed)
     *
     * @param  App\Eloquent\Projects\Project
     * @return Int
     */
    public function inRelation(Project $project)
    {
        $user = $this;

        $results = $project->results->reject(function ($resultProject) use ($user) {
            return $resultProject->result->trash || ! $resultProject->result->inRelation($user);
        });

        return $results->count();
    }
}
