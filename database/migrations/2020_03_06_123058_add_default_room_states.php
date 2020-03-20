<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddDefaultRoomStates extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('room_states', function(Blueprint $table) {
            $table->integer('fascist_board_amount')->default(0)->change();
            $table->integer('liberal_board_amount')->default(0)->change();
            $table->integer('fascist_policies')->default(11)->change();
            $table->integer('liberal_policies')->default(6)->change();
            $table->integer('chosen_fascist')->default(0)->change();
            $table->integer('chosen_liberal')->default(0)->change();
            $table->integer('election_tracker')->default(0)->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
