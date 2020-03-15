<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function (){
    return view('index');
});

Route::get('/profile', function (){
    return view('profile');
});

Route::get('/about', function (){
    return view('about');
});

Route::post('/room/{id}', "MessageController@sendMessage");

Route::get('/room/{id}', function (){
    return view('room');

});

Route::get('/auth/login', function () {
    return view('auth');
});


Route::middleware('guest')->group(function() {


    Route::get('auth/login', function() {
        return view('auth');
    });

    Route::get('/auth/register', function () {
        return view('auth');
    });

    Route::post('/register', 'Auth\RegisterController@register');
    Route::post('/login', 'Auth\LoginController@login');

});

Route::post('logout', 'Auth\LoginController@logout');
