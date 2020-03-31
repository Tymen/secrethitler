<?php

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/
use App\Broadcasting\RoomChannel;

Broadcast::channel('rooms-updated', function () {
    return true;
});

Broadcast::channel('room.{room}', RoomChannel::class);

