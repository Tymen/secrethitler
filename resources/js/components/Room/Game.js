import React, {Component} from 'react';
import PlayersLobby from "./Lobby/PlayersLobby";
import ChatLobby from "./Lobby/ChatLobby";
import {connect} from 'react-redux';
import Board from "../../components/Room/Game/Board";

class Game extends Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                        <div className="col-2 bg-dark col-wrap">
                            <div className="in-game">
                                <PlayersLobby users={this.props.users} page='Game'/>
                            </div>
                        </div>

                    <div className="col-7 bg-board">
                        <div className="board-section">
                            <div className="col-12 board-section">
                                <Board />
                            </div>
                            <div className="col-12 player-name-block"><p className="name-of-room">
                                <strong>Room: </strong>{this.props.room.name}</p>
                            </div>

                        </div>
                    </div>
                    <div className="col-3 col-wrap">
                        <div className="in-game">
                            <ChatLobby page='Game'/>
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
const mapStateToProps = state => {
    const { room } = state
    return { room: room }
}

export default connect(mapStateToProps)(Game)


