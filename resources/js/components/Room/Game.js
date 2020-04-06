import React, {Component} from 'react';
import PlayersLobby from "./Lobby/PlayersLobby";
import ChatLobby from "./Lobby/ChatLobby";
import Room from "../../pages/Room";

export default class Game extends Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                        <div className="col-2 bg-dark col-wrap">
                            <div className="in-game">
                                <PlayersLobby users={this.props.users} room={this.props.room} page='Game'/>
                            </div>
                        </div>

                    <div className="col-7 bg-board">
                        <div className="board-section">
                            <div className="col-12 board-section">

                            </div>
                            <div className="col-12 player-name-block"><p className="name-of-room">
                                <strong>Room: </strong>{this.props.roomName}</p>
                            </div>

                        </div>
                    </div>
                    <div className="col-3 col-wrap">
                        <div className="in-game">
                            <ChatLobby id={this.props.id} page='Game'/>
                        </div>
                    </div>
                </div>
                <div className="row row-under">
                    <div className="col-2 bg-grey">

                    </div>
                    <div className="col-7 bg-dark-grey">


                    </div>
                    <div className="col-3 bg-grey">
                        <button onClick={() => this.props.setInactive()}>Inactive</button>
                    </div>
                </div>

            </div>
        );
    }
}


