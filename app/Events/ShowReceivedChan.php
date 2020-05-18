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

class ShowReceivedChan implements ShouldBroadcast
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
    public function __construct(Room $room)
    {
        $this->roomID = $room->id;
        $president = User::role('Chancellor')->where('room_id', $room->id)->first();

        $room->roomState->changeState(7);
        $room->roomState->startTimer('everyone');
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
        return "receivedChan";
    }
}
