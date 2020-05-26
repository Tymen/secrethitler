import React, {Component} from 'react';
import {connect} from "react-redux";

class Lobby extends Component {

    state = {
        loaded: false
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                loaded: true
            })
        }, 1000)
    }

    render() {
        if (this.props.room?.owner?.id === this.props.authUser?.id) {
            return (
                <div>
                    <button className="btn start-game" onClick={() => this.props.setActive()}>Start game!</button>
                </div>
            );
        }else{
            return <div></div>
        }
    }
}

const mapStateToProps = state => {
    const {users, room} = state
    return {authUser: users.authUser, room: room, users: users.users}
}

export default connect(mapStateToProps)(Lobby)
