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

        Route::middleware('auth:api')->group(function () {
            Route::prefix('users')->group(function () {
                Route::get('check', 'UsersApiController@checkAuth');
                Route::get('me', 'UsersApiController@me');
                Route::get('auth', 'UsersApiController@auth');
            });

            Route::prefix('rooms')->group(function () {
                Route::post('/', 'RoomsApiController@store');

                Route::prefix('{room}')->group(function () {
                    Route::get('/', 'RoomsApiController@show');
                    Route::get('fascists', 'RoomsApiController@getFascists');
                    Route::get('get_policies', 'RoomsApiController@getPolicies');
                    Route::get('getboard', 'RoomsApiController@getBoard');
                    Route::get('showReceivedChan', 'RoomsApiController@showReceivedChan');
                    Route::get('reset_stage', 'RoomsApiController@reset_stage');
                    Route::get('get_president_policies', 'RoomsApiController@getPresidentPolicies');
                    Route::get('get_chancellor_policies', 'RoomsApiController@getChancellorPolicies');

                    Route::post('president', 'RoomsApiController@rotatePresident');
                    Route::post('set_policies', 'RoomsApiController@setPolicies');
                    Route::post('chancellor', 'RoomsApiController@setChancellor');
                    Route::post('president_truth_bluff', 'RoomsApiController@presidentTruthBluff');
                    Route::post('chancellor_truth_bluff', 'RoomsApiController@chancellorTruthBluff');

                    Route::post('truth_event', 'RoomsApiController@TruthEvent');

                    Route::post('chosen_president_options', 'RoomsApiController@showChosenPresidentPolicies');
                    Route::post('chosen_chancellor_options', 'RoomsApiController@showChosenChancellorPolicies');
                    Route::post('killed_player', 'RoomsApiController@killedPlayer');

                    Route::post('change_host', 'RoomsApiController@changeHost');
                    Route::post('active', 'RoomsApiController@setActive');
                    Route::post('check', 'RoomsApiController@checkState');
                    Route::post('inactive', 'RoomsApiController@setInactive');
                    Route::post('vote', 'RoomsApiController@setVote');
                    Route::post('kick/{user}', 'RoomsApiController@kickUser');

                    Route::delete('destroy', 'RoomsApiController@destroy');
                });
            });
        });
    });
});


