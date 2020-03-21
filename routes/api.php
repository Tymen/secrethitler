<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::namespace('Api')->prefix('v1')->middleware('auth:api')->group(function() {
    Route::prefix('users')->group(function() {
        Route::get('me', 'UsersApiController@me');
    });

    Route::prefix('rooms')->group(function() {
        Route::get('/', 'RoomsApiController@index');
        Route::post('/', 'RoomsApiController@store');

        Route::prefix('{id}')->group(function() {
            Route::get('active', 'RoomsApiController@getActive');
            Route::post('inactive', 'RoomsApiController@setInactive');
            Route::post('active', 'RoomsApiController@setActive');

            Route::post('leave', 'RoomsApiController@onUserLeave');
        });

    });
});
