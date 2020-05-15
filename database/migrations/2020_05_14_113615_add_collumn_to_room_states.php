<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddCollumnToRoomStates extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('room_states', function (Blueprint $table) {
            $table->string("received_pres")->after("chosen_policies")->nullable();
            $table->string("received_chan")->after("received_pres")->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('room_states', function (Blueprint $table) {
            //
        });
    }
}
