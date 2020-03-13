import React, {Component} from 'react';
import JoinRoom from "../components/Home/JoinRoom";
import CreateRoom from "../components/Home/CreateRoom";
import Rooms from "../components/Home/Rooms"

export default class Home extends Component {

    render() {
        return (
            <div className="container">
                <div className="row">
                    <img className="home-logo" src="images/Secrethitler-no-bg.png"/>
                </div>
                <div className="row">
                    <div className="col-4 offset-2 text-center">
                        <JoinRoom/>

                    </div>
                    <div className="col-4 text-center">
                        <CreateRoom/>

                    </div>
                </div>
                <div className="row">
                    <div className="rooms">
                        <div className="join-text">
                            Join a game
                        </div>
                        <div className="rooms-body">
                            <div className="room-name">
                                <Rooms/>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

