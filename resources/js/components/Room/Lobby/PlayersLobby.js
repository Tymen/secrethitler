import React, {Component} from 'react';
import {Link} from "react-router-dom";

export default class PlayersLobby extends Component {

    showPlayers = () => {

        return this.props.users.map(user => {
            return (
                <div key={user.id}>

                    <p className="player-name dropdown-toggle" type="button" id="dropdownMenuButton"
                       data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i className="fas fa-crown"></i>
                        &nbsp;{user.username}
                    </p>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton" >
                        <a className="dropdown-item" onClick={this.kickUser}>Kick {user.username}</a>
                   </div>
                </div>
            )
        })
    }

    render() {
        return (
            <div>
                <div className="show-players">
                    <div>
                        {this.showPlayers()}
                    </div>
                </div>
                <div className="players-in-lobby">
                    <h4>Players in lobby</h4>
                </div>
            </div>
        )

    }
}
