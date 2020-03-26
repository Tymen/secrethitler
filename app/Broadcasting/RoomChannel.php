<?php

namespace App\Broadcasting;

use App\User;

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
     * @param $id
     * @return array|\Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
     */
    public function join(User $user, $id)
    {
        if (auth()->check()) {
            $user->room_id = $id;
            $user->save();
            return ['id' => $user->id, 'username' => $user->username];
        }
        return redirect('/auth/login');
    }
}
