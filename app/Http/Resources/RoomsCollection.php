<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;
use App\Http\Resources\Room as RoomResource;

class RoomsCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return $this->map(function ($room) {
            return [
                'id' => $room->id,
                'name' => $room->name,
                'created_at' => $room->created_at,
                'owner' => $room->user,
            ];
        });
    }
}
