import React, {Component} from 'react';
import {connect} from "react-redux";
import {electionTracker, setBoardLiberal} from "../../../redux/actions/room-actions";

class Board extends Component {

    componentDidMount() {
        Echo.private(`room.${this.props.room.id}`)
            .listen('.election-tracker', e => {
                this.props.dispatch(electionTracker(e.electionTracker));
            })
    }

    render() {
        return (
            <div>
                <img className="img-fluid"
                     src={"/images/board/liberal/liberal-" + this.props.liberal + '-' + this.props.room.electionTracker + ".jpg"}/>
                <img className="img-fluid" src={"/images/board/fascist-" + this.props.fascist + ".jpg"}/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const {room, users} = state
    return {room: room, users: users.users}
}

export default connect(mapStateToProps)(Board)
