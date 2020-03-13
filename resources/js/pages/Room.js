import React, {Component} from 'react';
import Game from "../components/Room/Game";
import Lobby from "../components/Room/Lobby";
import ChatLobby from "../components/Lobby/ChatLobby";
import PlayersLobby from "../components/Lobby/PlayersLobby";

export default class Room extends Component {

    state = {
        users: [],
        active: false
    }

    componentDidMount() {
        this.getActive()

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

    }

    setActive = () => {
        this.setState({
            active: true
        })


    }

    render() {
        if (this.state.active) {
            return (
                <Game/>
            )
        }
        
        return (
            <div>
                <Lobby setActive={() => this.setActive()}/>
                <PlayersLobby users={this.state.users}/>
                <ChatLobby/>
            </div>
        )
    }
}
