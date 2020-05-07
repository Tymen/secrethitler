<?php

namespace App;

use App\Events\StartTimerEvent;
use App\Events\UpdateStageEvent;
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

    public function startTimer()
    {
        $this->timer_end = now()->addSeconds(15);
        $this->save();
        event(new StartTimerEvent($this->room, $this->timer_end));
    }
}
