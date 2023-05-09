<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AccountsTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        /* Role is hardcoded. */

        // Schema::create('users', function (Blueprint $table) {
        //     $table->bigIncrements('id');
        //     $table->bigInteger('uco')->unique();
        //     $table->smallInteger('role');
        //     $table->timestamps();
        //     $table->timestamp('activated_at')->nullable();
        // });

        /* Until finished_at is null it is still open. */

        Schema::create('log_users', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users');
            $table->bigInteger('line_log'); /* Information about connection. Bind to log file line created at this day. */
            $table->timestamps();
            // $table->timestamp('finished_at')->nullable();
            $table->unique(['user_id', 'created_at']);
        });

        // Remove / unlocked
        Schema::create('roles', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users');
            $table->unique(['user_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('log_users');
        Schema::dropIfExists('roles');
    }
}
