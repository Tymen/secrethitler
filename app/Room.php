<?php

namespace App;

use App\Events\RotatePresidentEvent;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Arr;

class Room extends Model
{
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function users()
    {
        return $this->hasMany(User::class);
    }

    public function roomState()
    {
        return $this->hasOne(RoomState::class);
    }

    public function rotatePresident()
    {
        $users = $this->users;
        $userIds = $users->pluck('id')->all();

        $president = User::role('President')->where('room_id', $this->id)->first();
        $lastUser = end($userIds);

        if ($president) {

            $president->removeRole('President');

            $key = array_search($president->id, $userIds);
            $president = $userIds[$key] === $lastUser ? $users[0] : $users[$key + 1];

        } else {
            $president = Arr::random($users->all());
        }
        $president->assignRole('President');

        event(new RotatePresidentEvent($this, ['id' => $president->id, 'username' => $president->username]));

    }

    public function divideRoles($users)
    {
        $fascists = false;

        switch ($users->count()) {
            case 5 :
            case 6 :
                $fascists = 2;
                break;
            case 7 :
            case 8 :
                $fascists = 3;
                break;
            case 9 :
            case 10 :
                $fascists = 4;
                break;
        }

        if ($fascists) {
            $users->map(function ($user) {
                foreach ($user->roles as $r) {
                    $r->name !== 'Admin' ? $user->removeRole($r->name) : false;
                }
            });
            $chosenFascists = Arr::random($users->all(), $fascists);
            $hitler = Arr::random($chosenFascists);

            foreach ($chosenFascists as $f) {
                $f->assignRole('Fascist');
            }

            $hitler->assignRole('Hitler');
        }
    }
}
