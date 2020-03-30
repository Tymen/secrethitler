<?php

namespace App\Http\Middleware;

use Closure;
use App\Room;

class CanJoinRoom
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $room = Room::find($request->id);

        if (!auth()->check()) {
            return redirect('/auth/login');
        }

        if ($room->users->count() >= $room->max_players) {
            return redirect('/')->with(['message' => 'Room is full']);
        }

        return $next($request);
    }
}
