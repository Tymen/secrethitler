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

    public function getFascists(User $user, Room $room, $fascists)
    {
        return in_array($user->id, $fascists)
            ? Response::allow()
            : Response::deny('You are not a fascist!');
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
//    public function policyValidation(User $user, Room $room, $request)
//    {
//        $changePolicies = $room->roomState;
//        $mergedRequest = $request->leftOver;
//        array_push($mergedRequest, $request->removed);
//        $getPolicyCheck = array_count_values(explode(" ",$changePolicies->chosen_policies));
//        $getMergedCheck = array_count_values($mergedRequest);
//        if (count($getMergedCheck) < 2) {
//            if ($getPolicyCheck["Liberal"] && $getPolicyCheck["Fascist"]){
//                if (array_key_exists("Liberal", $getMergedCheck) && array_key_exists("Fascist", $getMergedCheck)) {
//                    (($getMergedCheck["Liberal"] === $getPolicyCheck["Liberal"]) &&
//                        ($getMergedCheck["Fascist"] === $getPolicyCheck["Fascist"])) ?
//                        Response::allow() : Response::deny('Something went wrong try again');
//                } else {
//                    Response::deny('Something went wrong try again');
//                }
//            }else if($getPolicyCheck["Liberal"]){
//                ($getPolicyCheck["Liberal"] === $getMergedCheck["Liberal"]) ?
//                    Response::allow() : Response::deny('Something went wrong try again');;
//            }else {
//                ($getPolicyCheck["Fascist"] === $getMergedCheck["Fascist"]) ?
//                    Response::allow() : Response::deny('Something went wrong try again');;
//            }
//        }else {
//            Response::deny('Something went wrong try again');;
//        }
//    }
}
