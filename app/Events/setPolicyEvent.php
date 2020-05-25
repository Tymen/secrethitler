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
    public function __construct(Room $room, $board)
    {
        $this->roomID = $room->id;
        $this->policy = $board;
        $president = $room->getUserByRole('President');
        $condition = false;
        if ($room->roomState->fascist_board_amount >= 6){
            $winner = "fascist";
            $condition = true;
        }else if($room->roomState->liberal_board_amount >= 5){
            $winner = "liberal";
            $condition = true;
        }
        if($condition){
            event(new WinnerEvent($room, $winner));
            event(new SetInactive($room));
            $room->active = 0;
            $room->roomState->reset();
            $room->save();
        }
        $room->roomState->changeState(5);
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
