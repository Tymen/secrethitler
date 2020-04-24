<?php

namespace App\Events;

use App\Helper\AppHelper;
use App\Room;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class NewChancellorEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $room;
    public $chancellor;

    /**
     * Create a new event instance.
     *
     * @param $room
     * @param $chancellor
     */
    public function __construct($room, $chancellor)
    {
        $this->room = $room;
        $this->chancellor = $chancellor;
        AppHelper::changeState($room, 2);
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
        return 'new-chancellor';
    }
}
