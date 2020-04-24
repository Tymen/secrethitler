<?php


namespace App\Helper;


use App\Events\UpdateStageEvent;
use App\Room;

class AppHelper
{
    public static function changeState(Room $room, $stageNum)
    {
        $room->roomState->stage = $stageNum;
        $room->roomState->save();
        event(new UpdateStageEvent($room->id, $stageNum));
    }
}
