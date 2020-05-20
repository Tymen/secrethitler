<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

class UserCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request $request
     * @return array
     */
    public function toArray($request)
    {
        return $this->map(function ($user) {
            return [
                'id' => $user->id,
                'username' => $user->username,
                'isKilled' => $user->is_killed,
            ];
        });
    }
}
