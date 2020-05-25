<?php

namespace App\Http\Controllers\Api;


use App\Events\HostUserEvent;
use App\Events\ChooseRoleEvent;
use App\Events\KilledPlayerEvent;
use App\Events\PresidentChosenTruthBluff;
use App\Events\ChancellorChosenTruthBluff;
use App\Events\resetStage;
use App\Events\RotatePresidentEvent;
use App\Events\SetInactive;
use App\Events\ShowChosenPoliciesPresident;
use App\Events\ShowReceivedChan;
use App\Events\TruthEvent;
use App\Events\WinnerEvent;
use App\Http\Resources\UserCollection;
use App\Room;
use App\User;
use App\Http\Resources\User as UserResource;
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
    // Create a room
    public function store(Request $request)
    {
        $this->authorize('store', Room::class); // User role validation

        // Input validation
        $validator = Validator::make($request->all(), [
            'name' => 'required|unique:rooms|max:15|min:3',
        ]);

        // When the validator fails this will happen
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }


        // Creating a new room
        $room = new Room();
        $room->name = $request->name;
        $room->user_id = Auth::user()->id;
//        $room->password = $request->password;
        $room->save();

        $roomState = new RoomState();
        $roomState->room_id = $room->id;
        $roomState->save();

        // Sending a event to update the state of the front-end
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

    // Change a room to active
    public function setActive(Room $room)
    {
        $this->authorize('canActivate', $room);

        $room->divideRoles(); // Give every player in a room a role
        $room->rotatePresident(); // Change the president role in the room.

        $room->active = true; // Set the collumn active to true;
        $room->save();

        // Send a event to start the game for every player that's in the room
        event(new StartGameEvent($room->id));

        return response()->json(['message' => 'completed']);
    }

    // Get the policies that the president has received.
    public function presidentTruthBluff(Room $room, Request $request)
    {

        $this->authorize('isPresident', $room); // User role validation

        $chosenAnswer = $request->option; // Getting policy list if it is in the request.
        $roomState = $room->roomState; // Get the room model

        // If the user sended chosenanswer it will replace the truth with the given answers.
        if ($chosenAnswer === null) {
            event(new PresidentChosenTruthBluff($room));
        } else {
            event(new PresidentChosenTruthBluff($room));
            $roomState->received_pres = $chosenAnswer;
            $roomState->save();

        }

        return response()->json(['message' => 'completed']);
    }

    // Get the policies a changellor has received from the president.
    public function chancellorTruthBluff(Room $room, Request $request)
    {

        $this->authorize('isChancellor', $room);

        $chosenAnswer = $request->option; // Getting policy list if it is in the request.
        $roomState = $room->roomState; // Get the room model

        // If the user sended chosenanswer it will replace the truth with the given answers.
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
        // Get the truth policies from the president
        $options = $room->roomState->received_pres;

        return response()->json(['options' => explode(' ', $options)]);
    }

    public function getChancellorPolicies(Room $room)
    {
        // Get the truth policies from the chancellor
        $options = $room->roomState->received_chan;

        return response()->json(['options' => explode(' ', $options)]);
    }

    // See who is fascist in this room
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

    // Change the state to 1 and rotate the president
    public function rotatePresident(Room $room)
    {
        $this->authorize('inRoom', $room); // User role validation

        $room->rotatePresident(); // Rotate the president.

        return response()->json(['message' => 'completed']);
    }

    // On a certain point in the game the president can choose the next president.
    public function newPresident(Room $room, Request $request)
    {
        $this->authorize('isPresident', $room); // User role validation

        $president = $room->getUserByRole('President'); // Get the current president
        $president->removeRole('President'); // Remove the role president from the user

        $id = intval($request->uid); // Get the ID from the request. The id is of the new president.
        $newPres = User::find($id); // Find the user with this id.
        $newPres->assignRole('President'); // Asign the president role to this user.

        // Send a event that everyone updates the stage and the game.
        event(new RotatePresidentEvent($room, ['id' => $id, 'username' => $newPres->username]));
        return response()->json(['message' => 'completed']);
    }

    // Change a room to inactive
    public function setInactive(Room $room)
    {
        $this->authorize('isHost', $room); // User role validation

        $roomState = $room->roomState; // Get the state of the current room.

        // reset some values to 0
        $roomState->ja = 0;
        $roomState->nein = 0;
        $roomState->save();

        $room->users->map(function ($user) {
            $user->voted = false;
            $user->vote_type = NULL;
            $user->save();
        });

        // Send everyone back to the lobby
        event(new SetInactive($room));

        return response()->json(['message' => 'completed']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Room $room
     * @return \Illuminate\Http\JsonResponse
     * @throws \Exception
     */
    // Delete a room
    public function destroy(Room $room)
    {
        $this->authorize('isHost', $room); // User role validation

        // Remove the room from the users and the role.
        foreach ($room->users as $user) {
            $user->room_id = NULL;
            $user->hasRole('President') ? $user->removeRole("President") : false;
            $user->hasRole('Chancellor') ? $user->removeRole("Chancellor") : false;
            $user->save();
        }

        RoomState::destroy($room->roomState->id);

        $room->delete(); // Delete the room in the database

        event(new RoomsUpdatedEvent()); // Send a event that makes the room disapear.

        return response()->json(['message' => 'completed']);
    }

    // Remove user from a game
    public function kickUser(Room $room, User $user)
    {
        $this->authorize('isHost', $room); // User role validation

        // Remove the room id from the user.
        $user->room_id = NULL;
        $user->save();

        event(new KickUserEvent($room->id, $user->id)); // Send event that a user has been kicked.

        return response()->json(['message' => 'completed']);
    }

    // Change the host of a room.
    public function hostUser(Room $room, User $user)
    {
        $this->authorize('isHost', $room);

        $room->user_id = $user->id;
        $room->save();

        $collection = collect(['id' => $user['id'], 'username' => $user['username'], 'isKilled' => $user['is_killed']]);


        event(new HostUserEvent($room->id, $collection));

        return response()->json(['message' => $room]);
    }
    // Get the amound of policies on the play board
    public function getBoard(Room $room)
    {
        // Create a new object with the values of the different boards
        $object = (object)[
            "fascist" => $room->roomState->fascist_board_amount,
            "liberal" => $room->roomState->liberal_board_amount
        ];
        return response()->json($object);
    }

    // Get the policies
    public function getPolicies(Room $room)
    {
//        $randomInt = mt_rand(1, $total);
//        $result = ($randomInt > $facist) ? "Liberal" : 1;

        // If a user is a chancellor it will receive the cards in de policy
        if (Auth::user()->hasrole("Chancellor") && $room->roomState->stage == 4) {
            return response()->json(["result" => explode(" ", $room->roomState->chosen_policies)]);
        }

        $this->authorize('isPresident', $room); // User role validation

        $fascist = $room->roomState->fascist_policies;
        $liberal = $room->roomState->liberal_policies;

        $changePolicies = $room->roomState;

        $result = [];

        // if the database collumn is null it will get what's in it.
        if ($changePolicies->chosen_policies == null) {
            // this will reset the data base policies.
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

                if ($changePolicies->chosen_policies == "Fascist") {
                    $changePolicies->fascist_board_amount += 1;
                    $changePolicies->has_done = false;
                } else {
                    $changePolicies->liberal_board_amount += 1;
                }
                $changePolicies->chosen_policies = null;
                $board = (object)[
                    "fascist" => $room->roomState->fascist_board_amount,
                    "liberal" => $room->roomState->liberal_board_amount
                ];
                event(new setPolicyEvent($room, $board, 5));
                $changePolicies->save();
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
                ['id', '!=', Auth::id()],
                ['is_killed', false]
            ];

            $chancellor ? $condition[] = ['id', '!=', $chancellor->id] : false;
            $users = $room->users()->where($condition)->get();

            $id = Arr::random($users->pluck('id')->all());
        }

        $user = User::find($id);

        abort_unless($user, 400, 'User does not exist');
        abort_unless(Auth::id() !== $id, 400, 'Can not assign yourself');
        abort_unless(!$user->is_killed, 400, 'This user has been killed!');

        if ($chancellor) {
            abort_if($chancellor->id === $id, 400, 'Can not choose last chancellor again');
            $chancellor->removeRole('Chancellor');
        }

        $user->assignRole('Chancellor');

        event(new NewChancellorEvent($room, ['id' => $user->id, 'username' => $user->username]));

        return response()->json(['message' => 'completed']);
    }

    public function chooseRole(Room $room, Request $request)
    {
        $this->authorize('isPresident', $room);

        $chosenPlayer = $request->user;
        $role = '';

        $user = User::find($chosenPlayer['id']);


        if ($user->hasRole("Fascist")) {
            $role = 'Fascist';
        } else {
            $role = "Liberal";
        }

        event(new ChooseRoleEvent($room, $role, $chosenPlayer));

        return response()->json(['message' => 'completed']);
    }
    public function killedPlayer(Room $room, Request $request)
    {
        $this->authorize('isPresident', $room);

        $users = $room->users()->where([
            ['id', '!=', Auth::id()],
            ['is_killed', false]
        ])->get();

        $deadPlayer = Arr::random($users->all());

        if ($request->uid) {
            $deadPlayer = User::find($request->uid);
            $deadPlayer->is_killed = true;
            $deadPlayer->voted = true;
            $deadPlayer->save();
        }

        event(new KilledPlayerEvent($room,
            [
                'id' => $deadPlayer->id,
                'username' => $deadPlayer->username,
                'isKilled' => $deadPlayer->is_killed
            ]));

        if ($deadPlayer->hasRole('Hitler')) {
            event(new WinnerEvent($room, 'liberal', 'Hitler has been killed!'));
        }
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

    public function users(Room $room)
    {
        $users = $room->users;
        !$users->pluck('id')->contains(Auth::id())
            ? $users[] = (object)[
            'id' => Auth::id(),
            'username' => Auth::user()->username,
            'is_killed' => Auth::user()->is_killed
        ]
            : false;

        return new UserCollection($users);
    }

    public function checkState(Room $room)
    {
        $this->authorize('isPresident', $room);

        $total = $room->users->count();
        $condition = !$room->roomState->has_done && $room->roomState->stage === 8;
        switch (true) {
            case ($total === 5 || $total === 6) && $condition:
                $room->roomState->checkStateLow();
                break;
            case ($total === 7 || $total === 8) && $condition:
                $room->roomState->checkStateMid();
                break;
            case ($total === 9 || $total === 10) && $condition:
                $room->roomState->checkStateHigh();
                break;
            default:
                $room->rotatePresident();
        }
    }
}
