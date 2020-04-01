import React, {Component} from 'react';
import Game from "../components/Room/Game";
import Lobby from "../components/Room/Lobby";
import ChatLobby from "../components/Room/Lobby/ChatLobby";
import PlayersLobby from "../components/Room/Lobby/PlayersLobby";
import {Redirect} from 'react-router-dom'

export default class Room extends Component {

    state = {
        users: [],
        leftUsers: [],
        loggedIn: false,
        loaded: false,
        room: {},
    }

    componentDidMount() {
        this.getRoom()

        axios.get('/api/v1/users/me')
            .then(response => {
                this.setState({
                    loggedIn: response.data.isAuthenticated,
                    loaded: true
                })
            })
            .catch(error => {
                this.setState({
                    loaded: true
                })
            })

        Echo.join(`room.${this.props.match.params.id}`)
            .here((users) => {
                this.setState({
                    users: users
                })
            })
            .joining((user) => {
                this.onUserJoin(user)
            })
            .leaving((user) => {
                this.onUserLeave(user)
            })

    }

    componentWillUnmount() {
        axios.post(`/api/v1/rooms/${this.props.match.params.id}/leave`).then(
            Echo.leave(`room.${this.props.match.params.id}`)
        )
    }

    onUserJoin = (user) => {
        if (!this.state.users.some(u => u.id === user.id)) {
            this.setState({
                users: [...this.state.users, user]
            })
        }

        if (this.state.leftUsers.some(id => id === user.id)) {
            this.setState({
                leftUsers: this.state.leftUsers.filter(id => id !== user.id)
            })
        }
    }

    onUserLeave = (user) => {
        this.setState({
            leftUsers: [...this.state.leftUsers, user.id],
        })
        setTimeout(() => {
            if (this.state.leftUsers.some(id => id === user.id)) {
                this.state.room.owner.id === user.id ? this.getRoom() : false;

                this.setState({
                    users: this.state.users.filter(u => u.id !== user.id),
                    leftUsers: this.state.leftUsers.filter(u => u.id !== user.id),
                })
            }

        }, 7000)
    }

    getRoom = () => {
        axios.get(`/api/v1/rooms/${this.props.match.params.id}`).then(response => {
            this.setState({
                room: response.data.data
            })
        })
    };

    setActive = () => {
        axios.post(`/api/v1/rooms/${this.props.match.params.id}/active`).then(response => {
                this.setState({
                    room: {...this.state.room, active: 1}
                })
            }
        )
    };

    setInactive = () => {
        axios.post(`/api/v1/rooms/${this.props.match.params.id}/inactive`).then(response => {
                this.setState({
                    room: {...this.state.room, active: 0}
                })
            }
        )
    };

    render() {
        if (this.state.loaded) {
            if (this.state.room.active) {
                return (
                    <Game setInactive={() => this.setInactive()} users={this.state.users} id={this.props.match.params.id} room={this.state.room}/>
                )
            }

            return (
                <div className="container">
                    <div className="row">
                        <img className="home-logo" src="/images/Secrethitler-no-bg.png"/>
                    </div>
                    <div className="row">
                        <div className="room-info">
                            <p className="room-name">Room: {this.state.room.id}</p>
                            <p className="player-count">{this.state.users.length}/{this.state.room.max_players} Players</p>
                        </div>
                    </div>
                    <div className="row">
                        <PlayersLobby users={this.state.users}/>
                        <ChatLobby id={this.props.match.params.id}/>
                    </div>
                    <div className="row">
                        <Lobby setActive={() => this.setActive()}/>
                    </div>
                    <div className="height-for-start-button"/>
                </div>
            )
        }
        return <div></div>
    }
}
