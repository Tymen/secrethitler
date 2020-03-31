<?php

namespace App\Broadcasting;

use App\Room;
use App\User;
use http\Env\Response;

class RoomChannel
{
    /**
     * Create a new channel instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Authenticate the user's access to the channel.
     *
     * @param \App\User $user
     * @param Room $room
     * @return array|\Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
     */
    public function join(User $user, Room $room)
    {
        $user->room_id = $room->id;
        $user->save();

        return ['id' => $user->id, 'username' => $user->username];
    }
}
