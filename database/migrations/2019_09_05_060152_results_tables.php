<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ResultsTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        /* Types and ranks managed by admin. */

        // Remove / lock -> result-category
        Schema::create('types', function (Blueprint $table) {
            $table->smallIncrements('id');
            $table->string('name', 30)->unique();
            $table->text('description');
            $table->timestamps();
        });

        // Remove / lock -> result-category
        Schema::create('ranks', function (Blueprint $table) {
            $table->smallIncrements('id');
            $table->string('name', 10)->unique();
            $table->timestamps();
        });

        /* Result category is managed by authority. */

        // Trash - log / lock -> result
        Schema::create('result_categories', function (Blueprint $table) {
            $table->increments('id');
            $table->string('acronym', 100);
            $table->string('url', 200);
            $table->text('note');
            $table->enum('type', array('conference', 'workshop', 'journal'));
            $table->boolean('trash')->default(false);
            $table->unsignedSmallInteger('rank_id');
            $table->foreign('rank_id')->references('id')->on('ranks')->onDelete('cascade');
        });

        /* Not part of specific result. */

        /*  Status:
        1 - created
        2 - updated
        3 - trashed
        */
        Schema::create('log_result_categories', function (Blueprint $table) {
            $table->increments('id');
            $table->smallInteger('status')->default(1);
            $table->unsignedInteger('result_category_id');
            $table->foreign('result_category_id')->references('id')->on('result_categories')->onDelete('cascade');
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->timestamp('created_at');
            // $table->timestamp('finished_at')->nullable();
            $table->unique(['result_category_id', 'user_id', 'created_at']);
        });

        /* Result managed by involved users. Field 0 */

        // Trash - log / unlocked
        Schema::create('results', function (Blueprint $table) {
            $table->increments('id');
            $table->string('title', 255);
            $table->unsignedSmallInteger('type_id');
            $table->foreign('type_id')->references('id')->on('types')->onDelete('cascade');
            $table->unsignedInteger('result_category_id')->nullable();
            $table->foreign('result_category_id')->references('id')->on('result_categories');
            $table->unsignedBigInteger('author');
            $table->foreign('author')->references('id')->on('users')->onDelete('cascade');
            $table->enum('status', array('scheduled', 'in_progress', 'delayed', 'done'));
            $table->text('comment')->nullable();
            $table->boolean('trash')->default(false);
            $table->unique(['title']);
        });

        // Status same as result categories
        /*
        4 - Phases   - c
        5 - Phases   - u
        6 - Phases   - d
        7 - Added project
        8 - Removed project
        */
        Schema::create('log_results', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->smallInteger('status')->default(1);
            $table->unsignedInteger('result_id');
            $table->foreign('result_id')->references('id')->on('results')->onDelete('cascade');
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->timestamp('created_at');
            // $table->timestamp('finished_at')->nullable();
            $table->unique(['status', 'result_id', 'user_id', 'created_at']);
        });

        /**
         * User is added or deleted from result
         *
         * 1 - added as involved-user
         * 2 - updated as involved-user
         * 3 - removed as involved-user
         *
         * 4 - is author
         * 5 - is not author
         *
         * 6 - added
         * 7 - edited
         * 8 - removed
         *
         * 9 - added as coAuthor
         * 10 - removed as coAuthor
         */
        Schema::create('log_user_result', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->smallInteger('status')->default(1);
            $table->unsignedInteger('result_id');
            $table->foreign('result_id')->references('id')->on('results')->onDelete('cascade');
            $table->unsignedBigInteger('user_id');
            $table->foreign('added_user_id')->references('id')->on('users')->onDelete('cascade');
            $table->unsignedBigInteger('added_user_id');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->timestamp('created_at');
            $table->unique(['result_id', 'user_id', 'created_at', 'added_user_id', 'status']);
        });

        /* Managed only by author. Field 1 */

        // Remove / unlocked
        Schema::create('coauthors', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('result_id');
            $table->foreign('result_id')->references('id')->on('results')->onDelete('cascade');
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->timestamp('created_at');
            $table->unique(['result_id', 'user_id']);
        });

        /* Managed by authors and co-authors. Field 2 */

        // Remove / unlocked
        Schema::create('user_result', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedInteger('result_id');
            $table->foreign('result_id')->references('id')->on('results')->onDelete('cascade');
            $table->unsignedInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->timestamp('date_begin');
            $table->timestamp('date_end');
            $table->unique(['result_id', 'user_id']);
            $table->timestamp('created_at');
        });

        /* Managed by authors and co-authors. Field 3 */

        // Remove / lock -> involved users
        Schema::create('phases', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('result_id');
            $table->foreign('result_id')->references('id')->on('results')->onDelete('cascade');
            $table->string('name', 100);
            $table->timestamp('date_begin');
            $table->timestamp('date_end');
            $table->text('description');
            $table->timestamps();
        });

        // Remove / unlocked
        Schema::create('involved_users', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->unsignedInteger('phase_id');
            $table->foreign('phase_id')->references('id')->on('phases')->onDelete('cascade');
            $table->text('note')->nullable();
            $table->unique(['phase_id', 'user_id']);
            $table->timestamp('created_at');
        });

        /* Field 4 */

        // Remove / lock -> (just one related user (author) in result)
        Schema::create('result_project', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('project_id');
            $table->foreign('project_id')->references('id')->on('projects')->onDelete('cascade');
            $table->unsignedInteger('result_id');
            $table->foreign('result_id')->references('id')->on('results')->onDelete('cascade');
            $table->timestamp('created_at');
            $table->unique(['project_id', 'result_id']);
        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('result_project');
        Schema::dropIfExists('involved_users');
        Schema::dropIfExists('phases');
        Schema::dropIfExists('user_result');
        Schema::dropIfExists('coauthors');

        Schema::dropIfExists('log_user_result');
        Schema::dropIfExists('log_results');
        Schema::dropIfExists('results');

        Schema::dropIfExists('log_result_categories');
        Schema::dropIfExists('result_categories');
        Schema::dropIfExists('ranks');
        Schema::dropIfExists('types');

        Schema::dropIfExists('categories');
        Schema::dropIfExists('category_color_set');
    }
}
