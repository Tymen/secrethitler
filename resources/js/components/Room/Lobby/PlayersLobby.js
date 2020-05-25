import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {setNewOwner} from "../../../redux/actions/room-actions";

class PlayersLobby extends Component {

    componentDidMount() {
        setTimeout(this.listener, 500)
    }

    listener = () => {
        Echo.private(`room.${this.props.room.id}`)
            .listen('.user-hosted', (e) => {
                this.props.dispatch(setNewOwner(e.user))
                this.componentDidMount()
            })
    }

    checkPage = () => {
        if (this.props.page === "Game") {
            return `${this.props.users.length}/${this.props.room.max_players} Players`
        }
        return 'Players in lobby'
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log(document.getElementById("dropperu"))
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

    checkRole = (userId) => {
        if (this.props.room.president?.id === userId && this.props.page === "Game") {
            return (
                <div className="row">
                    <div className="col-sm-1 president-container">
                        <i className="fa fa-2x fa-long-arrow-right arrow1" aria-hidden="true"/>
                    </div>
                    <div className="col-sm-5">
                        <p className="president-container-p">President</p>
                    </div>
                </div>
            )
        }
        if (this.props.room.chancellor?.id === userId && this.props.page === "Game") {
            return (
                <div className="row">
                    <div className="col-sm-1 president-container">
                        <i className="fa fa-2x fa-long-arrow-right arrow1" aria-hidden="true"/>
                    </div>
                    <div className="col-sm-5">
                        <p className="president-container-p">Chancellor</p>
                    </div>
                </div>
            )
        }
    }

    kickUser = (e, id) => {
        e.preventDefault()
        axios.post(`/api/v1/rooms/${this.props.room.id}/kick/${id}`)
    }

    hostUser = (e, id) => {
            e.preventDefault()
            axios.post(`/api/v1/rooms/${this.props.room.id}/host/${id}`)
    }

    showUser = (user, owner = false) => {
        return (
            <div key={user.id} className={user.isKilled ? "player-name-div is-killed" : "player-name-div"}>
                <p className="player-name">
                    {owner ? <i className="fas fa-crown"></i> : false}
                    &nbsp;{user.username}
                </p>
                {user.isKilled ? <i className="is-killed-icon fas fa-skull-crossbones"></i> : false}
                {this.checkFascists(user.id)}
                {this.checkRole(user.id)}
            </div>
        )
    }

    ownerView = () => {
        return this.props.users.map(user => {
            if (this.props.room.owner?.id === user.id) {
                return this.showUser(user, true)
            } else {
                return (
                    <div key={user.id} className={user.isKilled ? "player-name-div is-killed" : "player-name-div"}>
                        <button className="player-name dropdown-toggle" type="button" id="dropdownMenuButton"
                           data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {user.username}
                        </button>
                        <div id="dropperu" className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <a className="dropdown-item"
                               onClick={(e) => this.kickUser(e, user.id)}>Kick player</a>
                            <a className="dropdown-item"
                               onClick={(e) => this.hostUser(e, user.id)}>Give host</a>
                        </div>
                        {user.isKilled ? <i className="is-killed-icon fas fa-skull-crossbones"></i> : false}
                        {this.checkFascists(user.id)}
                        {this.checkRole(user.id)}
                    </div>
                )
            }
        })
    }

    showPlayers = () => {
        const defaultView = this.props.users.map(user => {
            return this.props.room.owner?.id === user.id ? this.showUser(user, true) : this.showUser(user)
        })
        return this.props.authUser?.id === this.props.room.owner?.id ? this.ownerView() : defaultView;
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
    return {authUser: users.authUser, room: room, users: users.users}
}

export default connect(mapStateToProps)(PlayersLobby)
