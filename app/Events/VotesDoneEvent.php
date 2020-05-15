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

class VotesDoneEvent
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $roomId;

    /**
     * Create a new event instance.
     *
     * @param Room $room
     */
    public function __construct(Room $room)
    {
        $this->roomId = $room->id;
        $president = User::role('President')->where('room_id', $room->id)->first();

        $room->roomState->changeState(3);
        $room->roomState->startTimer($president->id);
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new PresenceChannel("room.{$this->roomId}");
    }
}
