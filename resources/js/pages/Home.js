import React, {Component} from 'react';
import JoinRoom from "../components/Home/JoinRoom";
import CreateRoom from "../components/Home/CreateRoom";
import Rooms from "../components/Home/Rooms"
import { messagesConfig } from "../appSettings";
import Notification from "../components/Universal/Notification";
import {Link} from "react-router-dom";

export default class Home extends Component {
    state = {
        getMsg: messagesConfig.pages.home,
    };
    constructor(props) {
        super(props);
        this.child = React.createRef();
    };
    notify = () => {
        this.child.getNotify(this.state.getMsg.auth.noLogin);
    };
    render() {
        return (
            <div className="container">
                <img className="home-logo" src="images/Secrethitler-no-bg.png"/>
                <div className="row">
                    <div className="col-4 offset-2 text-center">
                        <JoinRoom/>

                    </div>
                    <div className="col-4 text-center">
                        <CreateRoom/>

                    </div>
                </div>
                            <div className="col-12 join-text">
                            Join a game
                        </div>
                    <div className="background-rooms">
                        <Rooms/>
                    </div>
                <div className="row text-white container-explanation explanation-text">
                    <div className="col-12">
                        <h2 className="text-center text-bold">Game manual</h2>
                    </div>
                    <div className="col-12 my-2">
                        <p>
                            Secret Hitler is a card game, in the game you have liberals and fascists.
                            before the game starts the roles will be randomly distributed among the players in the game.
                        </p>
                        <p className="explanation-text-nospace">
                            The goal for the liberals is to find out who the fascist are and Hitler and then to kill
                            them.
                            When Hitler is killed the liberals will win the game, liberals can also win by filling in
                            all policy spots on the the blue side of the board (total of five blue policy cards).
                        </p>
                        <p>
                            As a fascist, you have to thwart the liberals and try to make the
                            liberals think you are not a fascist.
                            Fascists can win by getting six red policy cards on the red side of board.
                        </p>
                        <h5 className="my-3 mt-5">The game ends when:</h5>
                    </div>
                    <div className="col-12 explanation-text-nospace">
                        <p> -&nbsp;&nbsp;&nbsp;&nbsp;Hitler is killed (liberals win)</p>
                        <p>
                            -&nbsp;&nbsp;&nbsp;&nbsp;The red side of the board is filled with red policy cards(fascists
                            win)
                        </p>
                        <p> -&nbsp;&nbsp;&nbsp;&nbsp;The blue side is filled with blue policy cards(liberals win)</p>
                        <p>
                            -&nbsp;&nbsp;&nbsp;&nbsp;If Hitler becomes the chancellor by four or more red policy cards on
                            the board
                        </p>
                    </div>
                    <div className="col-12 btn-container-explanation">
                        <Link className="btn btn-explanation" to="/gamerules">
                            More info
                        </Link>
                    </div>
                </div>
                    </div>

        );
    }
}

