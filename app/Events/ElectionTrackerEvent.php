<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ElectionTrackerEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $roomId;
    public $electionTracker;

    /**
     * Create a new event instance.
     *
     * @param $roomId
     * @param $electionTracker
     */
    public function __construct($roomId, $electionTracker)
    {
        $this->roomId = $roomId;
        $this->electionTracker = $electionTracker;
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
        return 'election-tracker';
    }
}
