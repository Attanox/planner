<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class AddStatusAndFullnameToUsers extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::transaction(function () {
            Schema::table('users', function (Blueprint $table) {
                $table->string('first_name')->default('');
                $table->string('last_name')->default('');
                $table->enum('status', array('TEAM_MEMBER', 'EXTERNAL_COLLABORATOR', 'ALUMNI'))->default('TEAM_MEMBER');
            });

            $users = DB::table('users')->get();

            foreach ($users as $user) {
                $name_parts = explode(' ', $user->name, 2);

                DB::table('users')
                    ->where('id', $user->id)
                    ->update([
                        'first_name' => $name_parts[0],
                        'last_name' => count($name_parts) > 1 ? $name_parts[1] : '',
                    ]);
            }
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

        Schema::create('log_users', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->bigInteger('line_log'); /* Information about connection. Bind to log file line created at this day. */
            $table->timestamps();
            // $table->timestamp('finished_at')->nullable();
            $table->unique(['user_id', 'created_at']);
        });

        // Remove / unlocked
        Schema::create('roles', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->unique(['user_id']);
        });

        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['first_name', 'last_name', 'status']);
        });
    }
}
