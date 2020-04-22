import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";

class PlayersLobby extends Component {

    componentDidMount() {
    }

    checkPage = () => {
        if (this.props.page === "Game") {
            return `${this.props.users.length}/${this.props.room.max_players} Players`
        }
        return 'Players in lobby'
    }

    checkFascists = (userId) => {
        const hitler = <img src="/images/hitler-role-card-JPG.jpg"/>
        const fascist = <img src="/images/fascist-role-cardJPG.jpg"/>
        const liberal = <img src="/images/liberal-role-cardSmall-JPG.jpg"/>
        const condition = this.props.hitler === userId

        if (Array.isArray(this.props.fascists) && this.props.fascists.some(id => userId === id)) {
            return condition ? hitler : fascist
        } else if (this.props.page === "Game" && userId === this.props.authUser.id) {
            return condition ? hitler : liberal
        }
    }

    kickUser = (e, id) => {
        e.preventDefault()
        axios.post(`/api/v1/rooms/${this.props.room.id}/kick/${id}`)
    }

    showPlayers = () => {
        return this.props.users.map(user => {
            if (this.props.authUser?.id === this.props.room.owner?.id) {
                if (this.props.room.owner?.id === user.id) {
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
            if (this.props.room.owner?.id === user.id) {
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

const mapStateToProps = state => {
    const {users, room} = state
    return {authUser: users.authUser, room: room}
}

export default connect(mapStateToProps)(PlayersLobby)
