<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

// Observers
use App\Eloquent\Results\Result;
use App\Observers\ResultObserver;

use App\Eloquent\Results\Phase;
use App\Observers\PhaseObserver;

use App\Eloquent\Results\CoAuthor;
use App\Observers\CoAuthorObserver;

use App\Eloquent\Results\UserResult;
use App\Observers\UserResultObserver;

use App\Eloquent\Results\InvolvedUser;
use App\Observers\InvolvedUserObserver;

use App\Eloquent\Results\ResultProject;
use App\Observers\ResultProjectObserver;

use App\Eloquent\Projects\UserProject;
use App\Observers\UserProjectObserver;

use App\Eloquent\Projects\Milestone;
use App\Observers\MilestoneObserver;

use App\Eloquent\Projects\Project;
use App\Observers\ProjectObserver;

use App\Eloquent\Projects\UserProjectRole;
use App\Observers\UserProjectRoleObserver;

use App\Eloquent\Results\ResultCategory;
use App\Observers\ResultCategoryObserver;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        // set the public path to this directory
        $this->app->bind('path.public', function () {
            return base_path() . '/public';
        });
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Result::observe(ResultObserver::class);
        Phase::observe(PhaseObserver::class);
        CoAuthor::observe(CoAuthorObserver::class);
        UserResult::observe(UserResultObserver::class);
        InvolvedUser::observe(InvolvedUserObserver::class);
        ResultProject::observe(ResultProjectObserver::class);
        UserProject::observe(UserProjectObserver::class);
        Milestone::observe(MilestoneObserver::class);
        Project::observe(ProjectObserver::class);
        UserProjectRole::observe(UserProjectRoleObserver::class);
        ResultCategory::observe(ResultCategoryObserver::class);
    }
}
