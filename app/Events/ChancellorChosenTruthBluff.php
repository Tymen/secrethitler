<?php

namespace App\Events;

use App\Room;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ChancellorChosenTruthBluff implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    private $roomId;

    /**
     * Create a new event instance.
     *
     * @param $room
     */
    public function __construct(Room $room)
    {
        $this->roomId = $room->id;

        $room->roomState->changeState(8);
        $room->roomState->startTimer('everyone');
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new PresenceChannel('room.'. $this->roomId);
    }

    public function broadcastAs()
    {
        return 'chancellor-chosen-truth-bluff';
    }
}
