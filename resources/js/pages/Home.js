import React, {Component} from 'react';
import JoinRoom from "../components/Home/JoinRoom";
import CreateRoom from "../components/Home/CreateRoom";
import Rooms from "../components/Home/Rooms"
import {messagesConfig} from "../appSettings";
import Notification from "../components/Universal/Notification";
import {Link} from "react-router-dom";

export default class Home extends Component {
    state = {
        getMsg: messagesConfig.pages.home,
    };

    componentDidMount() {
        if (this.props.message !== null) {
            this.child.getNotify(this.state.getMsg.room.roomFull);
        }
    }

    constructor(props) {
        super(props);
        this.child = React.createRef();
    };

    notify = () => {
        this.child.getNotify(this.state.getMsg.auth.noLogin);
    };

    render() {
        return (
            <div>
                <img className="home-bolletjes" src="images/home-bolletjes.svg"/>
                <div className="container mt-5">
                    <img className="home-logo" src="images/Secrethitler-no-bg.png"/>
                    <div className="row">
                        <div className="col-4 offset-2 text-center">
                            <JoinRoom/>

                        </div>
                        <div className="col-4 text-center">
                            <CreateRoom/>

                        </div>
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
                    </div>
                    <Notification onRef={ref => (this.child = ref)}/>
                </div>
            </div>
        );
    }
}

