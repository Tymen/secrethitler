import React, {Component} from 'react';
import {connect} from "react-redux";

class ChosenChancellorOptions extends Component {

    state = {
        chancellorAnswer: [],
    }

    componentDidMount() {
        axios.get(`/api/v1/rooms/${this.props.room.id}/get_chancellor_policies`)
            .then(response => {
                this.setState({
                    chancellorAnswer: response.data.options,
                })
            })
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.room?.second <= 0) {
            if (this.props.room.owner?.id === this.props.authUser.id ){
                axios.post(`/api/v1/rooms/${this.props.room.id}/check`)
            }
        }
    }

    showChancellorOptions = () => {
        const liberal = <img src="/images/liberal-article.png" className="answer-chancellor-images"/>;
        const fascist = <img src="/images/facist-article.png" className="answer-chancellor-images"/>;

        return this.state.chancellorAnswer.map(option => {
            return option === 'Liberal' ? liberal : fascist
        })
    }

    render() {
        return (
            <div className="header-choose-chancellor">
                <div className="row">
                    <div className="col-2">
                        <p>{this.props.room?.second}</p>
                    </div>
                    <div className="col-8">
                        <p>The president claims he has received these cards</p>
                        <p className="under-title"></p>
                    </div>
                    <div className="col-2">
                    </div>
                </div>
                <div className="centered-options">
                    {this.showChancellorOptions()}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const {room, users} = state;
    return {room: room, authUser: users.authUser}
}
export default connect(mapStateToProps)(ChosenChancellorOptions)
