import React, {Component} from 'react';
import PlayersLobby from "./Lobby/PlayersLobby";
import ChatLobby from "./Lobby/ChatLobby";

export default class Game extends Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-2 bg-dark">
                        <PlayersLobby users={this.props.users}/>
                    </div>
                    <div className="col-7 bg-danger">
                        2
                    </div>
                    <div className="col-3 bg-info">
                        <ChatLobby id={this.props.id}/>
                    </div>
                </div>
            </div>
        );
    }
}

