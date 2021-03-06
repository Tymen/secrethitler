import React, {Component} from 'react';
import Game from "../components/Room/Game";
import Lobby from "../components/Room/Lobby";
import ChatLobby from "../components/Room/Lobby/ChatLobby";
import PlayersLobby from "../components/Room/Lobby/PlayersLobby";
import {connect} from 'react-redux';
import {messagesConfig} from "../appSettings";
import Notification from "../components/Universal/Notification";

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
    setPolicies,
    setWinner
} from "../redux/actions/room-actions";
import {addUser, changeUserIsKilled, deleteUser, setUsers, setAuthUser} from "../redux/actions/users-actions";

class Room extends Component {

    state = {
        leftUsers: [],
        loggedIn: false,
        loaded: false,
        timer: 0,
        getMsg: messagesConfig.pages.home,
    }
    constructor(props) {
        super(props);
        this.child = React.createRef();
    };
    async componentDidMount() {
        // $('.modal').modal();
        await this.getRoom()

        this.getUsers()

        Echo.join(`room.${this.props.room.id}`)
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
                this.props.dispatch(setBoardFascist(e.policy.fascist));
                this.props.dispatch(setBoardLiberal(e.policy.liberal));
            })
            .listen('.start-timer', (e) => {
                if (e.extra === this.props.authUser?.id || e.extra === 'everyone') {
                    clearInterval(this.state.timer)
                    this.props.dispatch(setSecond(e.second))
                    this.timer()
                }
            })
            .listen('.winner', (e) => {
                clearInterval(this.state.timer);
                this.props.dispatch(setWinner(e.winner));
                if(e.authUser.id === this.props.authUser.id){
                    this.props.dispatch(setAuthUser(e.authUser));
                }
            })
            .listen('.set-inactive', (e) => {
                this.props.dispatch(editActive(0))
                this.props.users.map(user => {
                   this.props.dispatch(changeUserIsKilled(user.id, false))
                })
            })
            .listen('.killed-player', (e) => {
                clearInterval(this.state.timer);
                if(e.killedPlayer.id === this.props.authUser.id){
                    this.props.dispatch(setAuthUser(e.killedPlayer));
                }
                this.props.dispatch(changeUserIsKilled(e.killedPlayer.id, true));
            })
    }

    componentWillUnmount() {
        Echo.leave(`room.${this.props.room.id}`)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.room.winner){
            this.winner();
        }
    }

    winner = () => {
        $('.modal').modal();
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
        if (!this.props.users.some(u => u.id === user.id)) {
            this.props.dispatch(addUser(user))
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
                    leftUsers: this.state.leftUsers.filter(id => id !== user.id),
                })
                this.props.dispatch(deleteUser(user.id))

                this.props.room.owner.id === user.id ? this.getRoom() : false;
            }
        }, 5000)
    }

    getRoom = async () => {
        await axios.get(`/api/v1/rooms/${this.props.match.params.id}`).then(response => {
            this.props.dispatch(setRoom(response.data.data))
        })

        this.timer()
    }

    getUsers = () => {
        axios.get(`/api/v1/rooms/${this.props.match.params.id}/users`).then(response => {
            this.props.dispatch(setUsers(response.data.data))
        })
    }

    setActive = () => {
        axios.post(`/api/v1/rooms/${this.props.match.params.id}/active`)
            .catch(err => {
                console.log(err)
                this.child.getNotify({type: "error", title: "Room", message: err.response.data.message});
        })
    };

    setInactive = () => {
        axios.post(`/api/v1/rooms/${this.props.match.params.id}/inactive`).then(response => {
                this.props.dispatch(editActive(0))
            }
        )
    };

    removeWinnerWindow = () =>{
        this.props.dispatch(setWinner(null));
    };
    getWinnerTeam = () => {
        const winner =  this.props.room.winner === 'fascist' ? 'winner-fascist' : 'winner-liberal'
        return <h1 className={`${winner} text-center wow fadeIn pt-3`}>-{this.props.room.winner}s-</h1>
    };
    render() {
        if (this.props.room.active) {
            return (
                <Game setInactive={() => this.setInactive()} rotatePresident={() => this.rotatePresident()}/>
            )
        }
        return (
            <div className="in-lobby">
                <Notification onRef={ref => (this.child = ref)} />
                <div className="container">
                    <div className="row">
                        <img className="home-logo" src="/images/Secrethitler-no-bg.png"/>
                    </div>
                    <div className="row">
                        <div className="room-info">
                            <p className="room-name">Room: {this.props.room.name}</p>
                            <p className="player-count">{this.props.users?.length}/{this.props.room.max_players} Players</p>
                        </div>
                    </div>
                    <div className="row">
                        <PlayersLobby/>
                        <ChatLobby/>

                    </div>
                    <div className="row">
                        <Lobby setActive={() => this.setActive()}/>
                    </div>
                    <div className="height-for-start-button"/>
                </div>
                <button onClick={() => this.test()}>
                    Launch demo modal
                </button>
                <div id="test" className="modal fade right" tabIndex="-1" role="dialog"
                     aria-labelledby="exampleModalPreviewLabel" aria-hidden="true">
                    <div className="modal-dialog-full-width modal-dialog momodel modal-fluid"
                         role="document">
                        <div className="modal-content-full-width modal-content ">
                            <div className="modal-body">
                                <img className="winner" src="/images/winner.png"/>
                                {this.getWinnerTeam()}
                            </div>
                            <div className="modal-footer-full-width  modal-footer">
                                <button type="button" className="btn btn-danger btn-md btn-rounded"
                                        data-dismiss="modal" onClick={() => this.removeWinnerWindow()}>Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const {users, room} = state
    return {authUser: users.authUser, room: room, users: users.users}
}

export default connect(mapStateToProps)(Room)
