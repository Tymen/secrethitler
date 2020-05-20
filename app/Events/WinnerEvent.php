<?php

namespace App\Events;

use App\Http\Resources\User as UserResource;
use App\Room;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Auth;

class WinnerEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $roomId;
    public $winner;
    public $description;
    public $authUser;

    /**
     * Create a new event instance.
     *
     * @param Room $room
     * @param $winner
     * @param $description
     */
    public function __construct(Room $room, $winner, $description = 'Party has all the policy cards')
    {
        $this->roomId = $room->id;
        $this->winner = $winner;
        $this->description = $description;
        $this->authUser = new UserResource(Auth::user());

        event(new SetInactive($room));
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
        return 'winner';
    }
}
