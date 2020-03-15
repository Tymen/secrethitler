<?php

namespace App\Http\Controllers;

use App\Events\SendMessage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MessageController extends Controller
{
    public function sendMessage(Request $request, $id){

        $user = Auth::user();

        $message = $request->message;

        if($message !== null){
            event(new SendMessage($message, $user));
        }
    }
}
