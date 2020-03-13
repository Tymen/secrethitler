import React, {Component} from 'react';
import {Link} from "react-router-dom";

export default class PlayersLobby extends Component {

    showPlayers = () => {

        return this.props.users.map(user => {
            return (
                <p key={user.id}>
                    {user.username}
                </p>
            )
        })
    }

    render() {
        return (
            <div>
                {this.showPlayers()}
            </div>
        )

    }
}
