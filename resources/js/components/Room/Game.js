import React, {Component} from 'react';
import PlayersLobby from "./Lobby/PlayersLobby";
import ChatLobby from "./Lobby/ChatLobby";
import {connect} from 'react-redux';
import Board from "../../components/Room/Game/Board";
import GameInteractionBlock from "./Game/GameInteractionBlock";


class Game extends Component {

    state = {
        fascists: [],
        hitler: '',
        loaded: false,
    }

    componentDidMount() {
        setTimeout(this.getFascists, 1000)
        setTimeout(() => $('#highlight-div').addClass('highlight'), 2500)
        setTimeout(() =>  $('#highlight-div').removeClass('highlight'), 4500)
    }

    getFascists = () => {
        axios.get(`/api/v1/rooms/${this.props.room.id}/fascists`).then(response => {
            this.setState(() => {
                return {
                    fascists: response.data.fascists,
                    hitler: response.data.hitler,
                    loaded: true
                }
            })
        }).catch(err => {
            this.setState(() => {
                return {
                    loaded: true
                }
            })
        })
    }

    rotatePresident = () => {
        axios.post(`/api/v1/rooms/${this.props.room.id}/president`)
    }

    render() {
        if (this.state.loaded) {
            return (
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-2 col-12 bg-dark col-wrap">
                            <div className="in-game">
                                <PlayersLobby users={this.props.users} page='Game' fascists={this.state.fascists}
                                              hitler={this.state.hitler}/>
                            </div>
                        </div>

                        <div className="col-md-7 col-12 bg-board">
                            <div className="board-section">
                                <div className="col-12 board-section">
                                    <Board/>
                                </div>
                                <div className="col-12 player-name-block"><p className="name-of-room">
                                    <strong>Room: </strong>{this.props.room.name}</p>
                                </div>

                            </div>
                        </div>

                        <div className="col-md-3 col-12 col-wrap">
                            <div className="in-game">
                                <ChatLobby page='Game'/>
                            </div>
                        </div>
                    </div>
                    <div className="row row-under">
                        <div className="col-2 bg-grey">

                        </div>
                        <div id="highlight-div" className="col-7 bg-dark-grey">
                            <GameInteractionBlock users={this.props.users}/>
                            <div className="ball-5"></div>
                        </div>
                        <div className="col-3 bg-grey">
                            <button onClick={() => this.props.setInactive()}>Inactive</button>
                            <button onClick={() => this.rotatePresident()}>Rotate president</button>
                        </div>
                    </div>

                </div>
            );
        }
        return (
            <div className="text-center">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const {room} = state
    return {room: room}
}
export default connect(mapStateToProps)(Game)


