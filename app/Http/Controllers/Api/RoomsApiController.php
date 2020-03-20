<?php

namespace App\Http\Controllers\Api;

use App\Room;
use App\RoomState;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Events\CreatedRoomEvent;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Http\Resources\RoomsCollection;
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
        return Response::create(new RoomsCollection(Room::with('user')->get()));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|unique:rooms|max:18|min:3',
        ]);

        if ($validator->fails()) {
            return Response::create($validator->errors(), 400);
        }

        if (Auth::user()->hostsRoom || Auth::user()->inRoom) {
            return Response::create('You already have a room or in a room', 400);
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

        return Response::create('completed');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Room  $room
     * @return \Illuminate\Http\Response
     */
    public function show(Room $room)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Room  $room
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Room $room)
    {
        //
    }

    public function setActive($id)
    {
        if (Auth::user()->hasRole('Host')) {
            $room = Room::find($id);
            $room->active = true;
            $room->save();
            return Response::create('completed');
        }
        return Response::create('Nice try, you are not the host!', 400);
    }

    public function setInactive($id)
    {
        if (Auth::user()->hasRole('Host')) {
            $room = Room::find($id);
            $room->active = false;
            $room->save();
            return Response::create('completed');
        }
        return Response::create('Nice try, you are not the host!', 400);
    }

    public function getActive($id)
    {
        $room = Room::find($id);
        return Response::create($room->active);
    }

    public function onUserJoin()
    {
        dd('test');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Room  $room
     * @return \Illuminate\Http\Response
     */
    public function destroy(Room $room)
    {
        //
    }
}
