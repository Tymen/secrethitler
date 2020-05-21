<?php

namespace App\Http\Middleware;

use Closure;
use App\Room;
use Illuminate\Support\Facades\Auth;

class CanJoinRoom
{
    /**
     * Handle an incoming request.
     *
     * @param \Illuminate\Http\Request $request
     * @param \Closure $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $room = Room::find($request->id);

        if (!$room) {
            return redirect('/')->with(['message' => 'Room does not exist']);
        }

        if (!Auth::check()) {
            return redirect('/auth/login')->with(['message' => 'You are not logged in']);
        }

        if (Auth::user()->room_id === $room->id) {
            return $next($request);
        }
        else if ($room->active) {
            return redirect('/')->with(['message' => 'Game has already started']);
        }

        if ($room->users->count() >= $room->max_players) {
            return redirect('/')->with(['message' => 'Chosen room is full!']);
        }

        return $next($request);
    }
}
