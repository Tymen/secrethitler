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

        Auth::user()->assignRole('Host');

        event(new CreatedRoomEvent());

        return response()->json(['message' => 'completed']);
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Room $room
     * @return \Illuminate\Http\Response
     */
    public function show(Room $room)
    {
        //
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
        $this->authorize('setActive', $room);

        $room->active = true;
        $room->save();
        return response()->json(['message' => 'completed']);
    }

    public function setInactive(Room $room)
    {
        $this->authorize('setInactive', $room);

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
     * @return \Illuminate\Http\Response
     */
    public function destroy(Room $room)
    {
        //
    }

    public function onUserLeave(Room $room)
    {
        $this->authorize('kickUser', $room);

        foreach (request()->ids as $id) {
            $user = User::find($id);

            foreach ($user->roles as $role) {
                $role->name !== 'Admin' ? $user->removeRole($role->name) : false;
            }

            $user->room_id = NULL;
            $user->save();

        }

        return response()->json(['message' => 'completed']);
    }
}
