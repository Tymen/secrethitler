<?php

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
                    Route::get('check', 'UsersApiController@checkAuth');
                    Route::get('me', 'UsersApiController@me');
                    Route::get('auth', 'UsersApiController@auth');
                });

                Route::prefix('rooms')->group(function () {
                    Route::post('/', 'RoomsApiController@store');

                    Route::prefix('{room}')->group(function () {
                        Route::get('/', 'RoomsApiController@show');
                        Route::get('/fascists', 'RoomsApiController@getFascists');
                        Route::get('get_policies', 'RoomsApiController@getPolicies');
                        Route::post('set_policies', 'RoomsApiController@setPolicies');
                        Route::post('change_host', 'RoomsApiController@changeHost');
                        Route::post('active', 'RoomsApiController@setActive');
                        Route::post('inactive', 'RoomsApiController@setInactive');
                        Route::post('kick/{user}', 'RoomsApiController@kickUser');
                        Route::delete('destroy', 'RoomsApiController@destroy');
                    });
                });
            });
        });
});


