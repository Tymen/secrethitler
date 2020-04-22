import React, {Component} from 'react';
import {connect} from 'react-redux';

class ChooseChancellor extends Component {

    state = {
        checkedUser: ''
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
            <div className="header-choose-chancellor"><p>Choose one of the players to be the chancellor</p></div>
            {this.showOptions()}
            <button type="submit" >submit</button>
        </div>
    )
}
}

const mapStateToProps = state => {
    const {users} = state;
    return {authUser: users.authUser}
}
export default connect(mapStateToProps)(ChooseChancellor);
