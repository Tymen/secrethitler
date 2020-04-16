<?php

namespace App\Policies;

use App\Room;
use App\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class RoomsPolicy
{
    use HandlesAuthorization;

    /**
     * Create a new policy instance.
     *
     * @return void
     */

    public function __construct()
    {
        //
    }

    public function isHost(User $user, Room $room)
    {
        return $user->id === $room->user_id
            ? Response::allow()
            : Response::deny('You are not the host');
    }

    public function isPresident(User $user, Room $room)
    {
        return $room->users->contains($user) && $user->hasRole("President")
            ? Response::allow()
            : Response::deny('You are not the president');;
    }

    public function store(User $user)
    {
        return $user->hostsRoom || $user->inRoom
            ? Response::deny('You already have or are in a room')
            : Response::allow();
    }

}
