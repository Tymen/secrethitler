<?php

namespace App\Events;

use App\Room;
use App\User;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class setPolicyEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;
    public $roomID;
    public $policy;
    /**
     * Create a new event instance.
     *
     * @param $roomID
     * @param $policy
     */
    public function __construct(Room $room, $board, $stage)
    {
        $this->roomID = $room->id;
        $this->policy = $board;
        $president = $room->getUserByRole('President');
        $condition = false;
        $room->save();
        if ($this->policy->fascist >= 6){
            $winner = "fascist";
            $condition = true;
        }else if($this->policy->liberal >= 5){
            $winner = "liberal";
            $condition = true;
        }
        if($condition){
            event(new WinnerEvent($room, $winner));
        }
        $room->roomState->changeState($stage);
        $room->roomState->startTimer($president->id);
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new PresenceChannel("room.{$this->roomID}");
    }
    public function broadcastAs()
    {
        return "get-policy";
    }
}
