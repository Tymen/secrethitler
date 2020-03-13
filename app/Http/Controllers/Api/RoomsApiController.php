<?php

namespace App\Http\Controllers\Api;

use App\Events\CreatedRoomEvent;
use App\Http\Resources\RoomsCollection;
use App\Room;
use App\RoomState;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
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

        $room = new Room();
        $room->name = $request->name;
        $room->user_id = Auth::user()->id;
        $room->password = $request->password || null;
        $room->save();

        $roomState = new RoomState();
        $roomState->room_id = $room->id;
        $roomState->save();

        event(new CreatedRoomEvent());

        return Response::create(['completed' => true]);
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
