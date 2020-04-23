<?php

namespace App\Http\Controllers\Api;

use App\Room;
use App\User;
use App\RoomState;
use Illuminate\Http\Request;
use App\Events\KickUserEvent;
use App\Events\StartGameEvent;
use App\Events\RoomsUpdatedEvent;
use App\Events\NewChancellorEvent;
use App\Events\RotatePresidentEvent;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Http\Resources\RoomCollection;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\Room as RoomResource;

class RoomsApiController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return RoomCollection
     */
    public function index()
    {
        return new RoomCollection(Room::with(['user'])->get());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
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

        event(new RoomsUpdatedEvent());

        return response()->json(['message' => 'completed', 'id' => $room->id]);
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Room $room
     * @return RoomResource
     */
    public function show(Room $room)
    {
        return new RoomResource($room);
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

        $room->divideRoles($room->users);
        $room->active = true;
        $room->save();

        event(new StartGameEvent($room->id));

        $room->rotatePresident($room);

        return response()->json(['message' => 'completed']);
    }

    public function getFascists(Room $room)
    {
        $fascists = [];
        $hitler = 0;
        $countUsers = $room->users->count();

        foreach ($room->users as $u) {

            $u->hasRole('Fascist') ? $fascists[] = $u->id : false;
            $u->hasRole('Hitler') ? $hitler = $u->id : false;
        }

        $this->authorize('getFascists', [$room, $fascists]);

        $data = ['fascists' => $fascists, 'hitler' => $hitler];
        $user = Auth::user()->id;

        if ($countUsers > 6 && $user === $hitler) {
            $data = ['hitler' => $hitler];
        }

        return response()->json($data);
    }

    public function rotatePresident(Room $room)
    {
        $this->authorize('inRoom', $room);

        $room->rotatePresident($room);

        return response()->json(['message' => 'completed']);
    }

    public function setInactive(Room $room)
    {
        $this->authorize('isHost', $room);

        $room->active = false;
        $room->save();

        return response()->json(['message' => 'completed']);
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

        event(new RoomsUpdatedEvent());

        return response()->json(['message' => 'completed']);
    }

    public function kickUser(Room $room, User $user)
    {
        $this->authorize('isHost', $room);

        $user->room_id = NULL;
        $user->save();

        event(new KickUserEvent($room->id, $user->id));

        return response()->json(['message' => 'completed']);
    }

    public function changeHost(Room $room, Request $request)
    {
        $this->authorize('isHost', $room);
        $room->user_id = $request->newUserHost;
        $room->save();
        return response()->json(['message' => $room]);
    }

    public function getPolicies(Room $room)
    {
//        $randomInt = mt_rand(1, $total);
//        $result = ($randomInt > $facist) ? "Liberal" : 1;
        $this->authorize('isPresident', $room);
        $fascist = $room->roomState->fascist_policies;
        $liberal = $room->roomState->liberal_policies;

        $result = [];
        $total = $liberal + $fascist;
        for ($i = 0; $i < 3; $i++) {
            $chance = round($fascist / $total * 100);
            $random = round(rand(0, 100));
            $result[] = $random < $chance ? "Fascist" : "Liberal";
        }
        $response = [
            'Fascist_cards' => $fascist,
            'Liberal_cards' => $liberal,
            'Card' => $result,
        ];
        $changePolicies = $room->roomState;
        $changePolicies->chosen_policies = implode(" ", $result);
        foreach ($result as $policy) {
            $test[] = (strtolower($policy) === "fascist") ?
                $changePolicies->fascist_policies = $changePolicies->fascist_policies - 1 :
                $changePolicies->liberal_policies = $changePolicies->liberal_policies - 1;
        }
        $changePolicies->save();
        return response()->json($response);
    }

    public function setPolicies(Room $room, Request $request)
    {
        $changePolicies = $room->roomState;
        $validation = $this->policyValidation($room, $request);

        if ($validation) {
            (strtolower($request->removed) === "fascist") ?
                $changePolicies->chosen_fascist += 1 :
                $changePolicies->chosen_liberal += 1;
            $changePolicies->save();
        } else {
            $request->leftOver = "Error";
        }

        return response()->json(['leftover' => $request->leftOver]);
    }

    private function policyValidation($room, $request)
    {
        $changePolicies = $room->roomState;
        $mergedRequest = $request->leftOver;
        array_push($mergedRequest, $request->removed);
        $getPolicyCheckDB = array_count_values(explode(" ", $changePolicies->chosen_policies));
        $getMergedCheck = array_count_values($mergedRequest);

        if (count($getMergedCheck) <= 2) {
            if (array_key_exists("Liberal", $getPolicyCheckDB) && array_key_exists("Fascist", $getPolicyCheckDB)) {
                if (array_key_exists("Liberal", $getMergedCheck) && array_key_exists("Fascist", $getMergedCheck)) {
                    $validation = (($getMergedCheck["Liberal"] === $getPolicyCheckDB["Liberal"]) &&
                        ($getMergedCheck["Fascist"] === $getPolicyCheckDB["Fascist"])) ?
                        true : false;
                } else {
                    $validation = false;
                }
            } else if (array_key_exists("Liberal", $getPolicyCheckDB)) {
                $validation = ($getPolicyCheckDB["Liberal"] === $getMergedCheck["Liberal"]) ?
                    true : false;
            } else {
                $validation = ($getPolicyCheckDB["Fascist"] === $getMergedCheck["Fascist"]) ?
                    true : false;
            }
        } else {
            $validation = false;
        }

        return $validation;
    }

    public function setChancellor(Room $room, Request $request)
    {
        $this->authorize('isPresident', $room);

        $chancellor = User::role('Chancellor')->where('room_id', $room->id)->first();
        $id = intval($request->uid);
        $user = User::find($id);

        abort_unless($user, 400, 'User does not exist');

        abort_unless(Auth::id() !== $id, 400, 'Can not assign yourself');

        if ($chancellor) {
            abort_if($chancellor->id === $id, 400, 'Can not choose last chancellor again');
            $chancellor->removeRole('Chancellor');
        }

        $user->assignRole('Chancellor');

        event(new NewChancellorEvent($room->id, $user->id));


        return response()->json(['message' => 'completed']);
    }
}
