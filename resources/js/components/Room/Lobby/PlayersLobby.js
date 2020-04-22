import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {setPresident} from "../../../redux/actions/room-actions";

class PlayersLobby extends Component {

    state = {
        president: 0,
        chancellor: 0,
    }

    componentDidMount() {
        this._isMounted = true
        // setTimeout(this.listener, 1000)
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    listener = () => {
        if (this.props.room.id) {
            // let channel = Echo.channel(`room.${this.props.room.id}`)
            //
            // channel.listen('.president-rotated', (e) => {
            //     if (this._isMounted) {
            //         this.props.dispatch(setPresident(e.president))
            //     }
            // })
        }
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

    checkPresident = (userId) => {
        const president = <p>President</p>

        if(this.props.room.president?.id === userId){
            return president
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
                            <i className="fa fa-2x fa-long-arrow-right arrow1" aria-hidden="true"></i>
                            {this.checkPresident(user.id)}
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
                            <i className="fa fa-2x fa-long-arrow-right arrow1" aria-hidden="true"></i>
                            {this.checkPresident(user.id)}
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
                        <i className="fa fa-2x fa-long-arrow-right arrow1" aria-hidden="true"></i>
                        {this.checkPresident(user.id)}
                    </div>
                )
            } else {
                return (
                    <div key={user.id} className="player-name-div">
                        <p className="player-name">
                            {user.username}
                        </p>
                        {this.checkFascists(user.id)}
                        <i className="fa fa-2x fa-long-arrow-right arrow1" aria-hidden="true"></i>
                        {this.checkPresident(user.id)}
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
