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

    public function canActivate(User $user, Room $room)
    {
        return $user->id === $room->user_id && $room->users->count() >= 5
            ? Response::allow()
            : Response::deny('The minimum amount of players to start has to be 5');
    }

    public function isPresident(User $user, Room $room)
    {
        return $room->users->contains($user) && $user->hasRole("President")
            ? Response::allow()
            : Response::deny('You are not the president');
    }

    public function isChancellor(User $user, Room $room)
    {
        return $room->users->contains($user) && $user->hasRole("Chancellor")
            ? Response::allow()
            : Response::deny('You are not the Chancellor');
    }

    public function store(User $user)
    {
        return $user->hostsRoom || $user->inRoom
            ? Response::deny('You already have or are in a room')
            : Response::allow();
    }

    public function getFascists(User $user, Room $room, $fascists)
    {
        return in_array($user->id, $fascists)
            ? Response::allow()
            : Response::deny('You are not a fascist!');
    }

    public function canVote(User $user, Room $room)
    {
        return $room->users->contains($user) && !$user->voted && !$user->is_killed
            ? Response::allow()
            : Response::deny('You can not vote!');
    }

    public function inRoom(User $user, Room $room)
    {
        return $room->users->contains($user)
            ? Response::allow()
            : Response::deny('User is not in room');
    }

    public  function isPresOrChan(User $user, Room $room)
    {
        return $user->hasAnyRole(["President", "Chancellor"])
            ? Response::allow()
            : Response::deny("You're not allowed to perform this action");
    }
}
