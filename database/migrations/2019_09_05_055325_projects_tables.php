<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ProjectsTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

        /* Edited only by admin of website
        That is why there is timestamps
        instead of log table. */

        // Remove / locked -> project
        Schema::create('projects_color_set', function (Blueprint $table) {
            $table->smallIncrements('id');
            $table->string('hex', 6)->unique();
            $table->timestamps();
        });

        // Trash / locked -> result-project, user-project
        Schema::create('projects', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name', 200)->unique();
            $table->timestamp('date_begin');
            $table->timestamp('date_end');
            $table->boolean('trash')->default(false);
            $table->unsignedSmallInteger('projects_color_set_id');
            $table->foreign('projects_color_set_id')->references('id')->on('projects_color_set');
        });

        /* Role is hardcoded. */

        // Trash / locked -> result-project
        Schema::create('user_project', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedInteger('project_id');
            $table->foreign('project_id')->references('id')->on('projects')->onDelete('cascade');
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->integer('occupancy');
            $table->boolean('trash')->default(false);
            $table->unique(['project_id', 'user_id']);
        });

        Schema::create('user_project_role', function (Blueprint $table) {
            $table->smallIncrements('id');
            $table->unsignedBigInteger('user_project_id');
            $table->foreign('user_project_id')->references('id')->on('user_project');
            $table->unique(['user_project_id']);
        });

        // Trash / locked -> project
        Schema::create('milestones', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedInteger('project_id')->index();
            $table->foreign('project_id')->references('id')->on('projects')->onDelete('cascade');
            $table->string('name', 200);
            $table->timestamp('date');
            $table->text('requirements');
            $table->boolean('trash')->default(false);
            $table->text('description')->nullable();
        });

        /* Editing tables */

        /**
         * 1 - c
         * 2 - u
         * 3 - d
         */
        Schema::create('log_projects', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->smallInteger('status')->default(1);
            $table->unsignedInteger('project_id');
            $table->foreign('project_id')->references('id')->on('projects')->onDelete('cascade');
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->timestamp('created_at');
            // $table->timestamp('finished_at')->nullable();
            $table->unique(['project_id', 'user_id', 'created_at']);
        });

        /**
         * 1 - c
         * 2 - u
         * 3 - d
         */
        Schema::create('log_milestones', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->smallInteger('status')->default(1);
            $table->unsignedBigInteger('milestone_id');
            $table->foreign('milestone_id')->references('id')->on('milestones')->onDelete('cascade');
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->timestamp('created_at');
            // $table->timestamp('finished_at')->nullable();
            $table->unique(['milestone_id', 'user_id', 'created_at']);
        });

        /**
         * 1 - c
         * 2 - u
         * 3 - d
         *
         * 4 - role c
         * 5 - role d
         */
        Schema::create('log_user_project', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->smallInteger('status')->default(1);
            $table->unsignedBigInteger('user_project_id');
            $table->foreign('user_project_id')->references('id')->on('user_project')->onDelete('cascade');
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->timestamp('created_at');
            // $table->timestamp('finished_at')->nullable();
            $table->unique(['user_project_id', 'user_id', 'created_at']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('log_user_project');
        Schema::dropIfExists('log_milestones');
        Schema::dropIfExists('log_projects');

        Schema::dropIfExists('milestones');
        Schema::dropIfExists('user_project_role');
        Schema::dropIfExists('user_project');
        Schema::dropIfExists('projects');
        Schema::dropIfExists('projects_color_set');
    }
}
