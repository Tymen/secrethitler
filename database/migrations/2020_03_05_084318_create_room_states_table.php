<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRoomStatesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('room_states', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('fascist_board_amount');
            $table->integer('liberal_board_amount');
            $table->integer('fascist_policies');
            $table->integer('liberal_policies');
            $table->integer('chosen_fascist');
            $table->integer('chosen_liberal');
            $table->integer('election_tracker');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('room_states');
    }
}
