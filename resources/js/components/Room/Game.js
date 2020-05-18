import React, {Component} from 'react';
import PlayersLobby from "./Lobby/PlayersLobby";
import ChatLobby from "./Lobby/ChatLobby";
import {connect} from 'react-redux';
import Board from "../../components/Room/Game/Board";
import GameInteractionBlock from "./Game/GameInteractionBlock";
import {setBoardLiberal, setBoardFascist} from "../../redux/actions/room-actions";


class Game extends Component {

    state = {
        fascists: [],
        hitler: '',
        loaded: false,
        board: false,
    }

    async componentDidMount() {
        await axios.get(`/api/v1/rooms/${this.props.room.id}/getboard`)
            .then(response => {
                this.props.dispatch(setBoardFascist(response.data.fascist));
                this.props.dispatch(setBoardLiberal(response.data.liberal));
                this.setState({board: true})
            }).catch(err => {
            })
        setTimeout(this.getFascists, 1000)
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
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
    test = () => {
        $('.modal').modal();
}
    render() {
        if (this.state.loaded && this.state.board) {
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
                                    <Board fascist={this.props.room.fascist_board} liberal={this.props.room.liberal_board}/>
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
                        <div className="col-7 bg-dark-grey">
                            <GameInteractionBlock users={this.props.users}/>
                        </div>
                        <div className="col-3 bg-grey">
                            <button onClick={() => this.test()}>
                                Launch demo modal
                            </button>
                            <div className="modal fade right" id="exampleModalPreview" tabIndex="-1" role="dialog"
                                 aria-labelledby="exampleModalPreviewLabel" aria-hidden="true">
                                <div className="modal-dialog-full-width modal-dialog momodel modal-fluid"
                                     role="document">
                                    <div className="modal-content-full-width modal-content ">
                                        <div className="modal-body">

                                            <h1 className="section-heading text-center wow fadeIn my-5 pt-3">Test</h1>
                                        </div>
                                        <div className="modal-footer-full-width  modal-footer">
                                            <button type="button" className="btn btn-danger btn-md btn-rounded"
                                                    data-dismiss="modal">Close
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
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


