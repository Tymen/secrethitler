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

    public $roomId;
    public $president;

    /**
     * Create a new event instance.
     *
     * @param $roomId
     * @param $president
     */
    public function __construct(Room $room, $president)
    {
        $this->roomId = $room->id;
        $this->president = $president;
        $this->changeStage($room);
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
        return 'president-rotated';
    }

    public function changeStage(Room $room)
    {
        $room->roomState->stage = 1;
        $room->roomState->save();

        event(new UpdateStageEvent($room->id));
    }
}
