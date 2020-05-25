import React, {Component} from 'react';
import {connect} from 'react-redux';

class ChooseRole extends Component {

    state = {
        checkedUser: '',
        checked: false,
        role: '',
    }

    componentDidMount() {
        const channel = Echo.private(`room.${this.props.room.id}`)

        channel.listen('.choose-role', e => {
            this.setState({
                role: e.role,
            })
        })
    }

    showRole = () => {
        const liberal = <img src="/images/liberal-role-cardSmall-JPG.jpg" className="answer-images"/>;
        const fascist = <img src="/images/fascist-role-cardJPG.jpg" className="answer-images"/>;

        return this.state.role === 'Fascist' ? fascist : liberal
    }

    handleSubmit = () => {
        axios.post(`/api/v1/rooms/${this.props.room.id}/choose_role`, {user: this.state.checkedUser})
            .then(response => {
                console.log(response);
                this.setState({
                    checked: true
                })
            })
    }

    isChecked = (user) => {
        this.setState({
            checkedUser: user
        })
    }

    showOptions = () => {
        return this.props.users.map(user => {
            if (user.id !== this.props.authUser?.id) {
                if (user.id === this.state.checkedUser.id) {
                    return (
                        <div className="options active" key={user.id}>
                            <label className="container-choose-chancellor">
                                <input type="radio" name="radio" onChange={() => this.isChecked(user)}/>
                                <img name={user.id} className="checkbox"/>
                                {user.username}
                            </label>
                        </div>

                    )
                } else {
                    return (
                        <div className="options" key={user.id}>
                            <label className="container-choose-chancellor">
                                <input type="radio" name="radio" onChange={() => this.isChecked(user)}/>
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
        if (this.state.checked) {
            return (
                <div className="header-choose-chancellor">
                    <div className="row">
                        <div className="col-2">
                            <p>{this.props.room?.second}</p>
                        </div>
                        <div className="col-8">
                            <p>{this.state.checkedUser.username} has this role:</p>
                        </div>
                        <div className="col-2">

                        </div>
                        <div className="show-role">
                            {this.showRole()}
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <div className="header-choose-chancellor">
                        <div className="row">
                            <div className="col-2">
                                <p>{this.props.room?.second}</p>
                            </div>
                            <div className="col-8">
                                <p>Choose one of the players to see there role</p>
                                <p className="under-title">(select one player and click submit to continue)</p>
                            </div>
                            <div className="col-2">
                                <button type="submit" className="btn btn btn-explanation btn-chancellor"
                                        onClick={(e) => {
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
}

const mapStateToProps = state => {
    const {room, users} = state;
    return {room: room, authUser: users.authUser}
}
export default connect(mapStateToProps)(ChooseRole);
