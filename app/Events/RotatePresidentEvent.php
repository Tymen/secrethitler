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

class RotatePresidentEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $room;
    public $president;

    /**
     * Create a new event instance.
     *
     * @param $room
     * @param $president
     */
    public function __construct(Room $room, $president)
    {
        $this->room = $room;
        $this->president = $president;

        $room->roomState->changeState(1);
        $room->roomState->startTimer($president['id']);
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new PresenceChannel("room.{$this->room->id}");
    }

    public function broadcastAs()
    {
        return 'president-rotated';
    }
}
