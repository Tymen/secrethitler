<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddForeignKeys extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function(Blueprint $table) {
            $table->unsignedBigInteger('room_id')->index()->nullable();
            $table->foreign('room_id')->references('id')->on('rooms');
        });

        Schema::table('rooms', function(Blueprint $table) {
            $table->unsignedBigInteger('user_id')->index();
            $table->foreign('user_id')->references('id')->on('users');
        });

        Schema::table('room_states', function (Blueprint $table) {
            $table->unsignedBigInteger('room_id')->index();
            $table->foreign('room_id')->references('id')->on('rooms');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function(Blueprint $table) {
            $table->dropForeign('room_id');
            $table->dropColumn('room_id');
        });

        Schema::table('room_states', function(Blueprint $table) {
            $table->dropForeign('room_id');
            $table->dropColumn('room_id');
        });

        Schema::table('rooms', function(Blueprint $table) {
            $table->dropForeign('user_id');
            $table->dropColumn('user_id');
        });
    }
}
