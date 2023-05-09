<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;

// Policies
use App\Eloquent\Results\Result;
use App\Policies\ResultPolicy;

use App\Eloquent\Results\Phase;
use App\Policies\PhasePolicy;

use App\Eloquent\Projects\Project;
use App\Policies\ProjectPolicy;

use App\Eloquent\Projects\UserProject;
use App\Policies\UserProjectPolicy;

use App\Eloquent\Projects\Milestone;
use App\Policies\MilestonePolicy;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        // 'App\Model' => 'App\Policies\ModelPolicy',
        Result::class => ResultPolicy::class,
        Phase::class => PhasePolicy::class,
        Project::class => ProjectPolicy::class,
        UserProject::class => UserProjectPolicy::class,
        Milestone::class => MilestonePolicy::class
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        Gate::define('isAdmin', function($user) {
            return $user->isAdmin();
        });
    }
}
