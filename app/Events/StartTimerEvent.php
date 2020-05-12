<?php

namespace App\Events;

use App\Room;
use App\User;
use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Support\Facades\Auth;

class StartTimerEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $roomId;
    public $second;
    public $extra;

    /**
     * Create a new event instance.
     *
     * @param Room $room
     * @param $end
     * @param $extra
     */
    public function __construct(Room $room, $end, $extra)
    {
        $this->roomId = $room->id;
        $this->second = $end->unix() - now()->unix();
        $this->extra = $extra;
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

    public function broadcastAs()
    {
        return 'start-timer';
    }
}
