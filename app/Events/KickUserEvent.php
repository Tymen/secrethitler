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

<<<<<<< HEAD:app/Events/KickUserEvent.php
class KickUserEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $roomId;
    public $userId;

=======
class setPolicyEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;
    public $roomID;
    public $policy;
>>>>>>> Changed some validation and added events:app/Events/setPolicyEvent.php
    /**
     * Create a new event instance.
     *
     * @param $roomId
     * @param $userId
     */
<<<<<<< HEAD:app/Events/KickUserEvent.php
    public function __construct($roomId, $userId)
    {
        $this->roomId = $roomId;
        $this->userId = $userId;
=======
    public function __construct(Room $room)
    {
        $this->roomID = $room->id;
        $this->policy = [$room->roomState->chosen_policies];
>>>>>>> Changed some validation and added events:app/Events/setPolicyEvent.php
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
<<<<<<< HEAD:app/Events/KickUserEvent.php
        return 'user-kicked';
=======
        return "get-policy";
>>>>>>> Changed some validation and added events:app/Events/setPolicyEvent.php
    }
}
