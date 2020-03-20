import React, {Component} from 'react';
import Game from "../components/Room/Game";
import Lobby from "../components/Room/Lobby";
import ChatLobby from "../components/Room/Lobby/ChatLobby";
import PlayersLobby from "../components/Room/Lobby/PlayersLobby";
import {Redirect} from 'react-router-dom'

export default class Room extends Component {

    state = {
        users: [],
        active: 0,
        loggedIn: false,
        loaded: false,
    }

    componentDidMount() {
        this.getActive()

        axios.get('/api/v1/users/me')
            .then(response => {
                this.setState({
                    loggedIn: response.data,
                    loaded: true
                })
            })
            .catch(error => {
                this.setState({
                    loaded: true
                })
            })

        Echo.join('room.' + this.props.match.params.id)
            .here((users) => {

                this.setState({
                    users: users
                })
            })
            .joining((user) => {
                this.setState({
                    users: [...this.state.users, user]
                })
            })
            .leaving(user => {
                this.setState({
                    users: this.state.users.filter(u => u.id !== user.id)
                });
            })
    }


    getActive = () => {
        axios.get(`/api/v1/rooms/${this.props.match.params.id}/active`).then(response => {
            this.setState({
                active: response.data
            })
        })
    }

    setActive = () => {
        axios.post(`/api/v1/rooms/${this.props.match.params.id}/active`).then(response => {
                this.setState({
                    active: 1
                })
            }
        )
    }

    setInactive = () => {
        axios.post(`/api/v1/rooms/${this.props.match.params.id}/inactive`).then(response => {
                this.setState({
                    active: 0
                })
            }
        )
    }

    render() {
        if (this.state.active) {
            return (
                <Game setInactive={() => this.setInactive()}/>
            )
        }
        if (this.state.loaded) {
            if (this.state.loggedIn) {
                return (
                    <div className="container">
                        <div className="row">
                            <img className="home-logo" src="/images/Secrethitler-no-bg.png"/>
                        </div>
                        <div className="row">
                            <div className="room-info">
                                <p className="room-name">Room: {this.props.match.params.id}</p>
                                <p className="player-count">{this.state.users.length}/8 Players</p>
                            </div>
                        </div>
                        <div className="row">
                            <PlayersLobby users={this.state.users}/>
                            <ChatLobby id={this.props.match.params.id}/>
                        </div>
                        <div className="row">
                            <Lobby setActive={() => this.setActive()}/>
                        </div>
                    </div>
                )

            }
            return (<Redirect to="/auth/login"/>)
        }else{
            return(<div></div>)
        }
    }
}
