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

class SetInactive implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;
    private $roomID;
    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(Room $room)
    {
        $this->roomID = $room->id;

        $roomState = $room->roomState;

        $roomState->reset();

        $room->users->map(function ($user) {
            $user->voted = false;
            $user->vote_type = NULL;
            $user->is_killed = false;
            $user->save();
        });

        $room->active = false;
        $room->save();
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
        return "set-inactive";
    }
}
