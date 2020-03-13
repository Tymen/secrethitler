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

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
