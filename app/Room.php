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

    public function getUserByRole($role, $columns = false)
    {
        $query = User::role($role)->where('room_id', $this->id);
        return $columns ? $query->first($columns) : $query->first();
    }

    public function rotatePresident()
    {
        $users = $this->users()->where('is_killed', '=', false)->get();
        $userIds = $users->pluck('id')->all();

        $president = $this->getUserByRole('President');
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

    public function divideRoles()
    {
        $fascists = 0;

        switch ($this->users->count()) {
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

        $this->users->map(function ($user) {
            foreach ($user->roles as $r) {
                $r->name !== 'Admin' ? $user->removeRole($r->name) : false;
            }
        });

        if ($fascists) {
            $chosenFascists = Arr::random($this->users->all(), $fascists);
            $hitler = Arr::random($chosenFascists);

            foreach ($chosenFascists as $f) {
                $f->assignRole('Fascist');
            }

            $hitler->assignRole('Hitler');
        }
    }
}
