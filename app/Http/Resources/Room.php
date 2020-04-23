<?php

namespace App\Http\Resources;

use App\User;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\User as UserResource;

class Room extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $president = User::role('President')->where('room_id', $this->id)->first(['id', 'username']);
        $chancellor = User::role('Chancellor')->where('room_id', $this->id)->first(['id', 'username']);

        return [
            'id' => $this->id,
            'name' => $this->name,
            'created_at' => $this->created_at,
            'owner' => $this->user,
            'max_players' => $this->max_players,
            'active' => $this->active,
            'president' => $president,
            'chancellor' => $chancellor,
        ];
    }
}
