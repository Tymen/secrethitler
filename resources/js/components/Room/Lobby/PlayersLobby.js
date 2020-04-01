import React, {Component} from 'react';
import {Link} from "react-router-dom";

export default class PlayersLobby extends Component {

    state = {
        authUser: '',
    }

    componentDidMount() {
        axios.get('/api/v1/users/auth')
            .then(response => {
                this.setState({
                    authUser: response.data.username
                })
            })
    }

    showPlayers = () => {
        return this.props.users.map(user => {
            if(this.state.authUser === this.props.owner.username) {
                if (this.props.owner.username === user.username) {
                    return (
                        <div key={user.id}>
                            <p className="player-name">
                                <i className="fas fa-crown"></i>
                                &nbsp;{user.username}
                            </p>
                        </div>
                    )
                }else{
                    return (
                        <div key={user.id}>
                            <p className="player-name dropdown-toggle" type="button" id="dropdownMenuButton"
                               data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {user.username}
                            </p>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <a className="dropdown-item" onClick={this.kickUser}>Kick {user.username}</a>
                            </div>
                        </div>
                    )
                }
            }
            if(this.props.owner.username === user.username){
                return (
                    <div key={user.id}>
                        <p className="player-name">
                            <i className="fas fa-crown"></i>
                            &nbsp;{user.username}
                        </p>
                    </div>
                )
            }else{
                return (
                    <div key={user.id}>
                        <p className="player-name">
                            {user.username}
                        </p>
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
                    <h4>Players in lobby</h4>
                </div>
            </div>
        )

    }
}
