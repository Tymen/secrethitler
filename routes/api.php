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
Route::namespace('Api')->group(function () {
    Route::prefix('v1')->group(function () {
        Route::get('/rooms', 'RoomsApiController@index');

        Route::middleware('auth:api')->group(function() {
            Route::prefix('users')->group(function () {
                Route::get('me', 'UsersApiController@me');
            });

            Route::prefix('rooms')->group(function () {
                Route::post('/', 'RoomsApiController@store');

                Route::prefix('{room}')->group(function () {
                    Route::get('/', 'RoomsApiController@show');

                    Route::post('active', 'RoomsApiController@setActive');
                    Route::post('inactive', 'RoomsApiController@setInactive');
                    Route::post('leave', 'RoomsApiController@onUserLeave');
                    Route::delete('destroy', 'RoomsApiController@destroy');
                });
            });
        });
    });
});


