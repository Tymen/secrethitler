<?php

namespace App;

use App\Events\RotatePresidentEvent;
use App\Events\StartTimerEvent;
use App\Events\UpdateStageEvent;
use App\Events\VotesDoneEvent;
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

    public function voteHandler()
    {
        $room = $this->load('room', 'room.users')->room;
        if ($this->ja > $this->nein) {
            event(new VotesDoneEvent($room));
        } else {
            $room->rotatePresident();
        }

        foreach ($room->users as $user) {
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
}
