import React, {Component} from 'react';
import Game from "../components/Room/Game";
import Lobby from "../components/Room/Lobby";
import ChatLobby from "../components/Room/Lobby/ChatLobby";
import PlayersLobby from "../components/Room/Lobby/PlayersLobby";

export default class Room extends Component {

    state = {
        users: [],
        active: 0,
        refresh: false,
    };

    componentDidMount() {
        this.getActive();

        window.addEventListener("beforeunload", this.onRefresh());
        console.log(window.performance.getEntriesByType('navigation'))

        Echo.join(`room.${this.props.match.params.id}`)
            .here((users) => {
                this.setState({
                    users: users
                })
            })
            .joining((user) => {
                if(!this.state.users.some(u => u.id === user.id)) {
                    this.setState({
                        users: [...this.state.users, user]
                    })
                }
            })
            .leaving((user) => {
                // if () {
                //     this.setState({
                //         users: this.state.users.filter(u => user.id !== u.id)
                //     })
                // }
                console.log(window.performance.getEntriesByType('navigation'))
            })
    }

    componentWillUnmount() {
        window.removeEventListener('beforeunload', this.onRefresh())
    }

    onRefresh = () => {
        this.setState({
            refresh: true,
        })
    };

    leaveRoom = async () => {
        Echo.leave(`room.${this.props.match.params.id}`);
        await axios.post(`/api/v1/rooms/${this.props.match.params.id}/leave`);

        window.location.href = '/'
    };

    getActive = () => {
        axios.get(`/api/v1/rooms/${this.props.match.params.id}/active`).then(response => {
            this.setState({
                active: response.data
            })
        })
    };

    setActive = () => {
        axios.post(`/api/v1/rooms/${this.props.match.params.id}/active`).then(response => {
                this.setState({
                    active: 1
                })
            }
        )
    };

    setInactive = () => {
        axios.post(`/api/v1/rooms/${this.props.match.params.id}/inactive`).then(response => {
                this.setState({
                    active: 0
                })
            }
        )
    };

    render() {
        if (this.state.active) {
            return (
                <Game setInactive={() => this.setInactive()}/>
            )
        }

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
}
