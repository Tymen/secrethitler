<?php

namespace App\Http\Controllers\Api;

use App\Events\KilledPlayerEvent;
use App\Events\PresidentChosenTruthBluff;
use App\Events\ChancellorChosenTruthBluff;
use App\Events\resetStage;
use App\Events\ShowChosenPoliciesPresident;
use App\Events\ShowReceivedChan;
use App\Events\TruthEvent;
use App\Room;
use App\User;
use App\RoomState;
use Illuminate\Http\Request;
use App\Events\KickUserEvent;
use App\Events\StartGameEvent;
use App\Events\setPolicyEvent;
use App\Events\RoomsUpdatedEvent;
use App\Events\NewChancellorEvent;
use Illuminate\Support\Arr;
use App\Events\sendPoliciesChancellor;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Http\Resources\RoomCollection;
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

        $room->divideRoles();
        $room->rotatePresident();

        $room->active = true;
        $room->save();

        event(new StartGameEvent($room->id));

        return response()->json(['message' => 'completed']);
    }

    public function presidentTruthBluff(Room $room, Request $request)
    {

        $this->authorize('isPresident', $room);

        $chosenAnswer = $request->option;
        $roomState = $room->roomState;
        if ($chosenAnswer === null) {
            event(new PresidentChosenTruthBluff($room));
        } else {
            event(new PresidentChosenTruthBluff($room));
            $roomState->received_pres = $chosenAnswer;
            $roomState->save();

        }

        return response()->json(['message' => 'completed']);
    }

    public function chancellorTruthBluff(Room $room, Request $request)
    {

        $this->authorize('isChancellor', $room);

        $chosenAnswer = $request->option;
        $roomState = $room->roomState;
        if ($chosenAnswer === null) {
            event(new ChancellorChosenTruthBluff($room));
        } else {
            event(new ChancellorChosenTruthBluff($room));
            $roomState->received_chan = $chosenAnswer;
            $roomState->save();
        }

        return response()->json(['message' => 'completed']);
    }

    public function getPresidentPolicies(Room $room)
    {
        $options = $room->roomState->received_pres;

        return response()->json(['options' => explode(' ', $options)]);
    }

    public function getChancellorPolicies(Room $room)
    {
        $options = $room->roomState->received_chan;

        return response()->json(['options' => explode(' ', $options)]);
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
        $user = Auth::id();

        if ($countUsers > 6 && $user === $hitler) {
            $data = ['hitler' => $hitler];
        }

        return response()->json($data);
    }

    public function rotatePresident(Room $room)
    {
        $this->authorize('inRoom', $room);

        $room->rotatePresident();

        return response()->json(['message' => 'completed']);
    }

    public function setInactive(Room $room)
    {
        $this->authorize('isHost', $room);

        $roomState = $room->roomState;

        $roomState->ja = 0;
        $roomState->nein = 0;
        $roomState->save();

        $room->users->map(function ($user) {
            $user->voted = false;
            $user->vote_type = NULL;
            $user->save();
        });

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
            $user->hasRole('President') ? $user->removeRole("President") : false;
            $user->hasRole('Chancellor') ? $user->removeRole("Chancellor") : false;
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

    public function getBoard(Room $room)
    {
        $object = (object)[
            "fascist" => $room->roomState->fascist_board_amount,
            "liberal" => $room->roomState->liberal_board_amount
        ];
        return response()->json($object);
    }

    public function getPolicies(Room $room)
    {
//        $randomInt = mt_rand(1, $total);
//        $result = ($randomInt > $facist) ? "Liberal" : 1;
        if (Auth::user()->hasrole("Chancellor") && $room->roomState->stage == 4) {
            return response()->json(["result" => explode(" ", $room->roomState->chosen_policies)]);
        }
        $this->authorize('isPresident', $room);
        $fascist = $room->roomState->fascist_policies;
        $liberal = $room->roomState->liberal_policies;
        $changePolicies = $room->roomState;

        $result = [];
        if ($changePolicies->chosen_policies == null) {
            if (($changePolicies->fascist_policies < 3) || $changePolicies->liberal_policies < 3) {
                $changePolicies->fascist_policies = 11;
                $changePolicies->liberal_policies = 6;
                $changePolicies->save();
                $liberal = 6;
                $fascist = 11;
            }
            $total = $liberal + $fascist;
            for ($i = 0; $i < 3; $i++) {
                $chance = round($fascist / $total * 100);
                $random = round(rand(0, 100));
                $result[] = $random < $chance ? "Fascist" : "Liberal";
            }
            $changePolicies->received_pres = implode(" ", $result);
            $changePolicies->chosen_policies = implode(" ", $result);
            foreach ($result as $policy) {
                $test[] = (strtolower($policy) === "fascist") ?
                    $changePolicies->fascist_policies = $changePolicies->fascist_policies - 1 :
                    $changePolicies->liberal_policies = $changePolicies->liberal_policies - 1;
            }
        } else {
            $result = explode(" ", $changePolicies->chosen_policies);
        }
        $response = [
            'result' => $result,
        ];
        $changePolicies->save();
        return response()->json($response);
    }

    public function setPolicies(Room $room, Request $request)
    {
        $this->authorize("isPresOrChan", $room);

        $changePolicies = $room->roomState;
        $validation = $this->policyValidation($room, $request);

        if ($validation) {
            (strtolower($request->removed) === "fascist") ?
                $changePolicies->chosen_fascist += 1 :
                $changePolicies->chosen_liberal += 1;

            $chosenPoliciesArr = explode(" ", $changePolicies->chosen_policies);
            $getIndexPolicy = (array_search($request->removed, $chosenPoliciesArr));
            unset($chosenPoliciesArr[$getIndexPolicy]);

            $changePolicies->chosen_policies = implode(" ", $chosenPoliciesArr);
            if (Auth::user()->hasrole("President")) {
                $getChan = $room->getUserByRole('Chancellor');
                $changePolicies->received_chan = $changePolicies->chosen_policies;
                $changePolicies->save();
                event(new sendPoliciesChancellor($room, $getChan->id));
            } else {
                $changePolicies->chosen_policies == "Fascist" ?
                    $changePolicies->fascist_board_amount += 1 :
                    $changePolicies->liberal_board_amount += 1;
                $changePolicies->chosen_policies = null;
                $board = (object)[
                    "fascist" => $room->roomState->fascist_board_amount,
                    "liberal" => $room->roomState->liberal_board_amount
                ];
                event(new setPolicyEvent($room, $board));
            }
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
        sort($getPolicyCheckDB);
        sort($getMergedCheck);
        return $getMergedCheck === $getPolicyCheckDB ? true : false;
    }

    public function showReceivedChan(Room $room)
    {
        event(new ShowReceivedChan($room));
        return response()->json(["message" => "Completed"]);
    }

    public function resetStage(Room $room)
    {
        $room->roomState->changeStage(1);
        return response()->json(["message" => "Completed"]);
    }

    public function setChancellor(Room $room, Request $request)
    {
        $this->authorize('isPresident', $room);

        abort_unless($room->roomState->stage === 1, 400, 'Wrong stage');

        $chancellor = $room->getUserByRole('Chancellor');

        if ($request->uid) {
            $id = intval($request->uid);
        } else {
            $condition = [
                ['id', '!=', Auth::id()]
            ];

            $chancellor ? $condition[] = ['id', '!=', $chancellor->id] : false;
            $users = $room->users()->where($condition)->get();

            $id = Arr::random($users->pluck('id')->all());
        }

        $user = User::find($id);

        abort_unless($user, 400, 'User does not exist');
        abort_unless(Auth::id() !== $id, 400, 'Can not assign yourself');

        if ($chancellor) {
            abort_if($chancellor->id === $id, 400, 'Can not choose last chancellor again');
            $chancellor->removeRole('Chancellor');
        }

        $user->assignRole('Chancellor');

        event(new NewChancellorEvent($room, ['id' => $user->id, 'username' => $user->username]));

        return response()->json(['message' => 'completed']);
    }

    public function killedPlayer(Room $room, Request $request)
    {
        $this->authorize('isPresident', $room);
        $chosenPlayer = $request->uid;

        event(new KilledPlayerEvent($room, $chosenPlayer));
    }

    public function setVote(Room $room, Request $request)
    {
        $this->authorize('canVote', $room);

        $roomState = $room->roomState;

        $request->nein ? $roomState->nein += 1 : $roomState->ja += 1;
        $roomState->save();

        $user = Auth::user();
        $user->voted = true;
        $user->vote_type = $request->nein ? 'nein' : 'ja';
        $user->save();

        !$room->users()->pluck('voted')->contains(false) ? $roomState->voteHandler() : false;

        return response()->json(['message' => 'completed']);
    }

}
