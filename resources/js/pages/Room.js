import React, {Component} from 'react';
import Game from "../components/Room/Game";
import Lobby from "../components/Room/Lobby";
import ChatLobby from "../components/Room/Lobby/ChatLobby";
import PlayersLobby from "../components/Room/Lobby/PlayersLobby";

export default class Room extends Component {

    state = {
        users: [],
        active: 0,
    }

    componentDidMount() {
        this.getActive()

        Echo.join(`room.${this.props.match.params.id}`)
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

        return (
            <div className="container">
                <div className="row">
                    {/*<img className="home-logo" src="/images/Secrethitler-no-bg.png"/>*/}
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
}
