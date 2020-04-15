import React, {Component} from 'react';
import {Link} from "react-router-dom";

export default class PlayersLobby extends Component {

    state = {
        authUser: '',
    }

    checkPage = () => {
        if (this.props.page === "Game") {
            return `${this.props.users.length}/${this.props.room.max_players} Players`
        }
        return 'Players in lobby'
    }

    checkFascists = (userId) => {
        if (Array.isArray(this.props.fascists) && this.props.fascists.some(id => userId === id)) {
            return (
                <img src="/images/fascist-role-card.svg"/>
            )
        }
    }

    checkLiberals = () => {
        if (Array.isArray(!this.props.fascists) && !this.props.fascists.some(id => userId === id)) {
            return (
                <img src="/images/liberal-role-card.svg"/>
            )
        }
    }

    kickUser = (e, id) => {
        e.preventDefault()
        axios.post(`/api/v1/rooms/${this.props.roomId}/kick/${id}`)
    }

    showPlayers = () => {
        return this.props.users.map(user => {

            if (this.props.authUser.id === this.props.ownerId) {
                if (this.props.ownerId === user.id) {
                    return (
                        <div key={user.id} className="player-name-div">
                            <p className="player-name">
                                <i className="fas fa-crown"></i>
                                &nbsp;{user.username}
                            </p>
                            {this.checkFascists(user.id)}
                        </div>
                    )
                } else {
                    return (
                        <div key={user.id} className="player-name-div">
                            <p className="player-name dropdown-toggle" type="button" id="dropdownMenuButton"
                               data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {user.username}
                            </p>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <a className="dropdown-item"
                                   onClick={(e) => this.kickUser(e, user.id)}>Kick {user.username}</a>
                            </div>
                            {this.checkFascists(user.id)}
                        </div>
                    )
                }
            }
            if (this.props.ownerId === user.id) {
                return (
                    <div key={user.id} className="player-name-div">
                        <p className="player-name">
                            <i className="fas fa-crown"></i>
                            &nbsp;{user.username}
                        </p>
                        {this.checkFascists(user.id)}
                    </div>
                )
            } else {
                return (
                    <div key={user.id} className="player-name-div">
                        <p className="player-name">
                            {user.username}
                        </p>
                        {this.checkFascists(user.id)}
                    </div>
                )
            }
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
                    <h4>{this.checkPage()}</h4>
                </div>
            </div>
        )
    }
}
