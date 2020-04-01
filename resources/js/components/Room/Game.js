import React, {Component} from 'react';
import PlayersLobby from "./Lobby/PlayersLobby";
import ChatLobby from "./Lobby/ChatLobby";

export default class Game extends Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-2 bg-dark">
                        <div className="test">
                            <PlayersLobby users={this.props.users} room={this.props.room} page='Game'/>
                        </div>
                    </div>
                    <div className="col-7 bg-board">
                        2
                    </div>
                    <div className="col-3 bg-info">
                        <div className="test">
                            <ChatLobby id={this.props.id}/>
                        </div>
                    </div>
                    <button onClick={() => this.props.setInactive()}>Inactive</button>
                </div>
            </div>
        );
    }
}

