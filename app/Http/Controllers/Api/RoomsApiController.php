<?php

namespace App\Http\Controllers\Api;

use App\Room;
use App\User;
use App\RoomState;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Events\CreatedRoomEvent;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserCollection;
use App\Http\Resources\RoomCollection;
use Illuminate\Support\Facades\Validator;

class RoomsApiController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Response::create(new RoomCollection(Room::with('user')->get()));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $this->authorize('store', Room::class);

        $validator = Validator::make($request->all(), [
            'name' => 'required|unique:rooms|max:15|min:3',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $room = new Room();
        $room->name = $request->name;
        $room->user_id = Auth::user()->id;
//        $room->password = $request->password;
        $room->save();

        $roomState = new RoomState();
        $roomState->room_id = $room->id;
        $roomState->save();

        event(new CreatedRoomEvent());

        return response()->json(['message' => 'completed']);
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Room $room
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Room $room)
    {
        return response()->json(['room' => $room]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Room $room
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Room $room)
    {
        //
    }

    public function setActive(Room $room)
    {
        $this->authorize('isHost', $room);

        $room->active = true;
        $room->save();
        return response()->json(['message' => 'completed']);
    }

    public function setInactive(Room $room)
    {
        $this->authorize('isHost', $room);

        $room->active = false;
        $room->save();

        return response()->json(['message' => 'completed']);
    }

    public function getActive(Room $room)
    {
        return response()->json($room->active);
    }

    public function getUsers(Room $room)
    {
        return response()->json(new UserCollection($room->users));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Room $room
     * @return \Illuminate\Http\JsonResponse
     * @throws \Exception
     */
    public function destroy(Room $room)
    {
        $this->authorize('isHost', $room);

        foreach ($room->users as $user) {
            $user->room_id = NULL;
            $user->save();
        }

        RoomState::destroy($room->roomState->id);

        $room->delete();

        return response()->json(['message' => 'completed']);
    }

    public function kickUser(User $user, Room $room)
    {
        $this->authorize('isHost', $room);

        //
    }

    public function onUserLeave(Room $room)
    {
        $user = Auth::user();

        foreach ($user->roles as $role) {
            $role->name !== 'Admin' ? $user->removeRole($role->name) : false;
        }

        $user->room_id = NULL;
        $user->save();

        if ($room->users->isEmpty()) {
            $this->callAction('destroy', ['room' => $room]);
        }
        else if ($room->user_id === $user->id) {
            $newHost = $room->users->first();
            $room->user_id = $newHost->id;
            $room->save();
        }

        return response()->json(['message' => 'completed']);
    }
}
