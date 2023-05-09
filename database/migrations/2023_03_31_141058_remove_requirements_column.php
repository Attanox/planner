<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class RemoveRequirementsColumn extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('milestones', function (Blueprint $table) {
            $table->dropColumn('requirements');
        });
    }

    public function down()
    {
        Schema::table('milestones', function (Blueprint $table) {
            $table->text('requirements')->default('');
        });
    }

}
