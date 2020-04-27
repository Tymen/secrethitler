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

class NewChancellorEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $room;
    public $userId;

    /**
     * Create a new event instance.
     *
     * @param $room
     * @param $userId
     */
    public function __construct($room, $userId)
    {
        $this->room = $room;
        $this->userId = $userId;
        $this->changeState($room);
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

    public function changeState(Room $room)
    {
        $room->roomState->stage = 2;
        $room->roomState->save();
        event(new UpdateStageEvent($room->id));
    }
}
