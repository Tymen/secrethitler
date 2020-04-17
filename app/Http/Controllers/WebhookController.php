<?php

namespace App\Http\Controllers;

use App\Room;
use App\User;
use App\RoomState;
use Illuminate\Http\Request;
use App\Events\RoomsUpdatedEvent;

class WebhookController extends Controller
{
    public function handle(Request $request)
    {
        $signature = hash_hmac('sha256', json_encode($request->all()), config('broadcasting.connections.pusher.secret'));

        if ($signature === $request->header('X-Pusher-Signature')) {
            $event = $request->events[0];
            $user = User::find($event['user_id']);
            $room = Room::find(explode('.', $event['channel'])[1]);

            if ($user && $room) {
                $params = ['user' => $user, 'room' => $room];

                switch ($event['name']) {
                    case 'member_added':
                        $this->callAction('onMemberJoin', $params);
                        break;
                    case 'member_removed':
                        $this->callAction('onMemberLeave', $params);
                        break;
                }
                return 1;
            }
        }
        return response()->json(['message' => 'You shall not pass!'], 401);
    }

    public function onMemberJoin(User $user, Room $room)
    {
        $user->room_id = $room->id;
        $user->save();
    }

    public function onMemberLeave(User $user, Room $room)
    {
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
