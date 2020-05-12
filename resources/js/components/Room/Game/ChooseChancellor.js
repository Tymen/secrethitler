import React, {Component} from 'react';
import {connect} from 'react-redux';

class ChooseChancellor extends Component {

    state = {
        checkedUser: ''
    }
    handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`/api/v1/rooms/${this.props.room.id}/chancellor`, {uid: this.state.checkedUser})
    }

    isChecked = (userId) => {
        this.setState({
            checkedUser: userId
        })
    }

    showOptions = () => {
        return this.props.users.map(user => {
            if (user.id !== this.props.authUser?.id) {
                if(user.id === this.state.checkedUser){
                    return (
                        <div className="options active" key={user.id}>
                            <label className="container-choose-chancellor">
                                <input type="radio" name="radio" onChange={() => this.isChecked(user.id)}/>
                                <img name={user.id} className="checkbox"/>
                                {user.username}
                            </label>
                        </div>

                    )
                }else{
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

render()
{
    return (
        <div>
            <div className="header-choose-chancellor">
                <div className="row">
                    <div className="col-2">
                    </div>
                    <div className="col-8">
                        <p>Choose one of the players to be the chancellor</p>
                        <p className="under-title">(select one player and click submit to continue)</p>
                    </div>
                    <div className="col-2">
                        <button type="submit" className="btn btn btn-explanation btn-chancellor" onClick={(e) => this.handleSubmit(e)}>submit</button>
                    </div>
                </div>
            </div>
            {this.showOptions()}
        </div>
    )
}
}

const mapStateToProps = state => {
    const {users, room} = state;
    return {authUser: users.authUser, room: room}
}
export default connect(mapStateToProps)(ChooseChancellor);
