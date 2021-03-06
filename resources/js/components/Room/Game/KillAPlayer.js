import React, {Component} from 'react';
import {connect} from "react-redux";

class KillAPlayer extends Component {
    state = {
        checkedUser: ''
    }

    handleSubmit = () => {
        axios.post(`/api/v1/rooms/${this.props.room.id}/killed_player`, {uid: this.state.checkedUser})
    }

    isChecked = (userId) => {
        this.setState({
            checkedUser: userId
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.room?.second <= 0) {
            this.handleSubmit()
        }
    }

    showOptions = () => {
        return this.props.users.filter(user => !user.isKilled).map(user => {
            if (user.id !== this.props.authUser?.id) {
                if (user.id === this.state.checkedUser) {
                    return (
                        <div className="options active" key={user.id}>
                            <label className="container-choose-chancellor">
                                <input type="radio" name="radio" onChange={() => this.isChecked(user.id)}/>
                                <img name={user.id} className="checkbox"/>
                                {user.username}
                            </label>
                        </div>

                    )
                } else {
                    return (
                        <div className="options" key={user.id}>
                            <label className="container-choose-chancellor">
                                <input type="radio" name="radio" onChange={() => this.isChecked(user.id)}/>
                                <img name={user.id} className="checkbox"/>
                                {user.username}
                            </label>
                        </div>
                    )
                }

            }
        })
    }

    render() {
        return (
            <div>
                <div className="header-choose-chancellor">
                    <div className="row">
                        <div className="col-2">
                            <p>{this.props.room?.second}</p>
                        </div>
                        <div className="col-8">
                            <p>Choose the player you want to kill</p>
                            <p className="under-title">(select one player and click submit to continue)</p>
                        </div>
                        <div className="col-2">
                            <button type="submit" className="btn btn btn-explanation btn-chancellor" onClick={(e) => {
                                e.preventDefault();
                                this.handleSubmit()
                            }}>submit
                            </button>
                        </div>
                    </div>
                    {this.showOptions()}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const {room, users} = state;
    return {room: room, authUser: users.authUser, users: users.users}
}
export default connect(mapStateToProps)(KillAPlayer)
