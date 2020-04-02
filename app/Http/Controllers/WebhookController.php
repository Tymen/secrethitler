<?php

namespace App\Http\Controllers;

use App\Events\RoomsUpdatedEvent;
use App\Events\SendMessage;
use App\Room;
use App\RoomState;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class WebhookController extends Controller
{
    public function handle(Request $request)
    {
//        dd($request->events[0]);
        $event = $request->events[0];
        $user = User::find($event['user_id']);
        $room = Room::find(explode('.', $event['channel'])[1]);

        $params =['user' => $user, 'room' => $room];

        switch ($event['name']) {
            case 'member_added':
                $this->callAction('onMemberJoin', $params);
                break;
            case 'member_removed':
                $this->callAction('onMemberLeave', $params);
                break;
            default:
                break;
        }
    }

    public function onMemberJoin(User $user, Room $room)
    {
        $user->room_id = $room->id;
        $user->save();
    }

    public function onMemberLeave(User $user, Room $room)
    {
        foreach ($user->roles as $role) {
            $role->name !== 'Admin' ? $user->removeRole($role->name) : false;
        }

        $user->room_id = NULL;
        $user->save();

        if ($room->users->isEmpty()) {
            RoomState::destroy($room->roomState->id);
            $room->delete();
            event(new RoomsUpdatedEvent());
        }
        else if ($room->user_id === $user->id) {
            $newHost = $room->users->first();
            $room->user_id = $newHost->id;
            $room->save();
        }
    }
}
