<?php

namespace App\Events;

use App\Room;
use App\User;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class UpdateStageEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $roomId;
    public $stageNum;

    /**
     * Create a new event instance.
     * @param $roomId
     * @param $stageNum
     */
    public function __construct($roomId, $stageNum)
    {
        $this->roomId = $roomId;
        $this->stageNum = $stageNum;
        $room = Room::find($roomId);

        if ($stageNum === 9 || $stageNum === 12 || $stageNum === 11 || $stageNum === 10){
            $room->roomState->startTimer($room->getUserByRole("President")->id);
        }
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
        return 'update-stage';
    }
}
