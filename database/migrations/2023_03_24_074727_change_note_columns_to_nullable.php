<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ChangeNoteColumnsToNullable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('types', function (Blueprint $table) {
            $table->text('description')->nullable()->change();
        });
        Schema::table('result_categories', function (Blueprint $table) {
            $table->text('note')->nullable()->change();
        });
        Schema::table('phases', function (Blueprint $table) {
            $table->text('description')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('types', function (Blueprint $table) {
            $table->dropColumn('description');
        });
        Schema::table('result_categories', function (Blueprint $table) {
            $table->dropColumn('note');
        });
        Schema::table('phases', function (Blueprint $table) {
            $table->dropColumn('description');
        });
    }
}
