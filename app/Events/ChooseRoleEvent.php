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

class ChooseRoleEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $roomId;
    public $role;
    public $chosenPlayer;

    /**
     * Create a new event instance.
     *
     * @param Room $room
     * @param $role
     * @param $chosenPlayer
     */
    public function __construct(Room $room, $role, $chosenPlayer)
    {
        $this->roomId = $room->id;
        $this->role = $role;
        $this->chosenPlayer = $chosenPlayer;

        $room->roomState->has_done = true;
        $room->roomState->save();
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new PrivateChannel("room.{$this->roomId}");
    }

    public function broadcastAs()
    {
        return 'choose-role';
    }
}
