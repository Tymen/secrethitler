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

class sendPoliciesChancellor implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;
    public $policies;
    public $roomID;
    public $chancellorID;

    /**
     * Create a new event instance.
     *
     * @param Room $room
     * @param $chancellorID
     */
    public function __construct(Room $room, $chancellorID)
    {
        $this->roomID = $room->id;
        $this->policies = explode(" ",$room->roomState->chosen_policies);
        $this->chancellorID = $chancellorID;
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
        return "get-policies-chancellor";
    }
}
