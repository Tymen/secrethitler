<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use phpDocumentor\Reflection\Types\Null_;

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

    public function rotatePresident($users)
    {
        $allUsers = $users->all();

        $president = false;
        $lastUser = end($allUsers);

        foreach ($allUsers as $u) {
            $u->hasRole('President') ? $president = $u->id : false;
        }

        if ($president) {
            foreach ($allUsers as $u) {
                $u->hasRole('President') ? $president = $u->id : false;
                $u->removeRole('President');
            }

            if($allUsers[$president-1] === $lastUser){
                $president = $allUsers[0];
            }else{
                $president = $allUsers[$president];
            }
        } else {
            $president = Arr::random($allUsers);
        }
        $president->assignRole('President');

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
