<?php

namespace App;

use App\Events\RotatePresidentEvent;
use App\Events\StartTimerEvent;
use App\Events\UpdateStageEvent;
use App\Events\VotesDoneEvent;
use App\Events\WinnerEvent;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class RoomState extends Model
{
    public function getTimerEndAttribute($value)
    {
        return Carbon::parse($value);
    }

    public function room()
    {
        return $this->belongsTo(Room::class);
    }

    public function changeState($value)
    {
        $this->stage = $value;
        $this->save();
        event(new UpdateStageEvent($this->room->id, $value));
    }

    public function reset()
    {
        $this->ja = 0;
        $this->nein = 0;
        $this->fascist_board_amount = 0;
        $this->liberal_board_amount = 0;
        $this->fascist_policies = 11;
        $this->liberal_policies = 6;
        $this->chosen_fascist = 0;
        $this->chosen_liberal = 0;
        $this->election_tracker = 0;
        $this->stage = 0;
        $this->save();
    }

    public function voteHandler()
    {
        $room = $this->load('room', 'room.users')->room;
        if ($this->ja > $this->nein) {
            $condition = $this->fascist_board_amount >= 4 && $room->getUserByRole('Chancellor')->hasRole('Hitler');
            $event = $condition ? new WinnerEvent($room, "fascist", 'Hitler has been elected as the chancellor') : new VotesDoneEvent($room);
            event($event);
        } else {
            $room->rotatePresident();
        }

        foreach ($room->users()->where('is_killed', false)->get() as $user) {
            $user->voted = false;
            $user->save();
        }

        $this->ja = 0;
        $this->nein = 0;
        $this->save();
    }

    public function startTimer($extra = null)
    {
        $this->timer_end = now()->addSeconds(15);
        $this->save();
        event(new StartTimerEvent($this->room, $this->timer_end, $extra));
    }

    public function checkStateLow()
    {
        switch ($this->fascist_board_amount) {
            case 3:
                $this->changeState(9);
                $this->has_done = true;
                break;
            case 4:
                $this->room->rotatePresident();
                break;
            case 5:
                $this->changeState(12);
                break;
            default:
                $this->room->rotatePresident();
                break;
        }
        $this->save();
    }

    public function checkStateMid()
    {
        switch ($this->fascist_board_amount) {
            case 2:
                $this->changeState(10);
            case 3:
                $this->changeState(11);
            case 4:
                $this->room->rotatePresident();
            case 5:
                $this->changeState(12);
                break;
            default:
                $this->room->rotatePresident();
                break;
        }
    }

    public function checkStateHigh()
    {
        switch ($this->fascist_board_amount) {
            case 1:
            case 2:
                $this->changeState(10);
            case 3:
                // choose president event
            case 4:
                $this->room->rotatePresident();
            case 5:
                $this->changeState(12);
                break;
            default:
                $this->room->rotatePresident();
                break;
        }
    }
}
