import React, {Component} from 'react';
import Game from "../components/Room/Game";
import Lobby from "../components/Room/Lobby";
import ChatLobby from "../components/Room/Lobby/ChatLobby";
import PlayersLobby from "../components/Room/Lobby/PlayersLobby";
import {connect} from 'react-redux';

import {
    setBoardFascist,
    setBoardLiberal,
    chancellorChosenAnswer,
    editActive,
    presidentChosenAnswer,
    setChancellor,
    setPresident,
    setRoom,
    setSecond,
    setStage,
    setPolicies
} from "../redux/actions/room-actions";


class Room extends Component {

    state = {
        users: [],
        leftUsers: [],
        loggedIn: false,
        loaded: false,
        timer: 0,
    }

    async componentDidMount() {

        await this.getRoom()

        Echo.join(`room.${this.props.room.id}`)
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
            .listen('.president-rotated', (e) => {
                this.props.dispatch(setPresident(e.president))
            })
            .listen('.user-kicked', (e) => {
                if (this.props.authUser.id === e.userId) {
                    Echo.leave(`room.${this.props.room.id}`);
                    window.location.href = '/'
                }
            })
            .listen('.game-started', (e) => {
                this.props.dispatch(editActive(1))
            })
            .listen('.update-stage', (e) => {
                this.props.dispatch(setStage(e.stageNum))
            })
            .listen('.new-chancellor', (e) => {
                this.props.dispatch(setChancellor(e.chancellor))
            })
            .listen('.get-policies-chancellor', (e) => {
                if (this.props.authUser.id === e.chancellorID.id) {
                    this.props.dispatch(setPolicies(e.policies))
                }
            })
            .listen('.get-policy', (e) => {
                console.log(e)
                this.props.dispatch(setBoardFascist(e.policy.fascist));
                this.props.dispatch(setBoardLiberal(e.policy.liberal));
            })
            .listen('.start-timer', (e) => {
                console.log(e)
                if (e.extra === this.props.authUser?.id || e.extra === 'everyone') {
                    clearInterval(this.state.timer)
                    this.props.dispatch(setSecond(e.second))
                    this.timer()
                }
            })
    }

    componentWillUnmount() {
        Echo.leave(`room.${this.props.room.id}`)
    }

    timer = () => {
        const timer = setInterval(() => {
            this.setState({timer: timer})

            let cancel = false

            if (this.props.room.second <= 0) {
                cancel = true
                clearInterval(timer)
            }

            !cancel ? this.props.dispatch(setSecond(this.props.room.second - 1)) : false;
        }, 1000)
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
                this.setState({
                    users: this.state.users.filter(u => u.id !== user.id),
                    leftUsers: this.state.leftUsers.filter(id => id !== user.id),
                })

                this.props.room.owner.id === user.id ? this.getRoom() : false;
            }
        }, 5000)
    }

    getRoom = async () => {
        await axios.get(`/api/v1/rooms/${this.props.match.params.id}`).then(response => {
            this.props.dispatch(setRoom(response.data.data))
        })

        this.timer()
    };

    setActive = () => {
        axios.post(`/api/v1/rooms/${this.props.match.params.id}/active`)
    };

    setInactive = () => {
        axios.post(`/api/v1/rooms/${this.props.match.params.id}/inactive`).then(response => {
                this.props.dispatch(editActive(0))
            }
        )
    };

    render() {
        if (this.props.room.active) {
            return (
                <Game setInactive={() => this.setInactive()} rotatePresident={() => this.rotatePresident()}
                      users={this.state.users}/>
            )
        }
        return (
            <div className="in-lobby">
                <div className="container">
                    <div className="row">
                        <img className="home-logo" src="/images/Secrethitler-no-bg.png"/>
                    </div>
                    <div className="row">
                        <div className="room-info">
                            <p className="room-name">Room: {this.props.room.name}</p>
                            <p className="player-count">{this.state.users.length}/{this.props.room.max_players} Players</p>
                        </div>
                    </div>
                    <div className="row">
                        <PlayersLobby users={this.state.users}/>
                        <ChatLobby/>

                    </div>
                    <div className="row">
                        <Lobby setActive={() => this.setActive()}/>
                    </div>
                    <div className="height-for-start-button"/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const {users, room} = state
    return {authUser: users.authUser, room: room}
}

export default connect(mapStateToProps)(Room)
