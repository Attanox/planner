<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class RemoveUniqueConstraintForLogResults extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('log_results', function (Blueprint $table) {
            $table->dropUnique(['status', 'result_id', 'user_id', 'created_at']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('log_results', function (Blueprint $table) {
            $table->unique(['status', 'result_id', 'user_id', 'created_at']);
        });
    }
}
