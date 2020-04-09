import React, {Component} from 'react';
import PlayersLobby from "./Lobby/PlayersLobby";
import ChatLobby from "./Lobby/ChatLobby";
import Room from "../../pages/Room";
import Board from "../../components/Room/Game/Board";

export default class Game extends Component {
    state = {
        fascists: [],
    }

    componentDidMount() {
        axios.get(`/api/v1/rooms/${this.props.roomId}/fascists`).then(response => {
            this.setState({
                fascists: response.data.fascists
            })
        })
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-2 bg-dark col-wrap">
                        <div className="in-game">
                            <PlayersLobby users={this.props.users} room={this.props.room} authUser={this.props.user}
                                          ownerId={this.props.ownerId} roomId={this.props.roomId} page='Game'
                                          fascists={this.state.fascists}
                            />
                        </div>
                    </div>

                    <div className="col-7 bg-board">
                        <div className="board-section">
                            <div className="col-12 board-section">
                                <Board/>
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


