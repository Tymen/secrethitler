<?php

namespace App\Policies;

use App\Room;
use App\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;
use Illuminate\Support\Facades\Auth;

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

    private function isHost($user, $room)
    {
        return $user->id === $room->user_id
            ? Response::allow()
            : Response::deny('You are not the host');
    }

    public function setActive(User $user, Room $room)
    {
        return $this->isHost($user, $room);
    }

    public function setInactive(User $user, Room $room)
    {
        return $this->isHost($user, $room);
    }

    public function kickUser(User $user, Room $room)
    {
        return $this->isHost($user, $room);
    }

}
