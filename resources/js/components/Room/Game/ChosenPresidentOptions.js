import React, {Component} from 'react';
import {connect} from "react-redux";

class ChosenPresidentOptions extends Component {

    state = {
        presidentAnswer: [],
    }

    componentDidMount() {
        axios.get(`/api/v1/rooms/${this.props.room.id}/get_president_policies`)
            .then(response => {
                this.setState({
                    presidentAnswer: response.data.options,
                })
            }).catch(error => {})
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.room?.second <= 0) {
            if (this.props.room.president.id === this.props.authUser.id ){
                axios.get(`/api/v1/rooms/${this.props.room.id}/showReceivedChan`)
            }
        }
    }
    showPresidentOptions = () => {
        const liberal = <img src="/images/liberal-article.png" className="answer-images"/>;
        const fascist = <img src="/images/facist-article.png" className="answer-images"/>;

        return this.state.presidentAnswer.map(option => {
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
                        <button type="submit" className="btn btn btn-explanation btn-chancellor"
                                onClick={(e) => this.handleSubmit(this.state.CardOption)}>submit
                        </button>
                    </div>
                </div>
                <div className="centered-options">
                    {this.showPresidentOptions()}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const {room, users} = state;
    return {room: room, authUser: users.authUser}
}
export default connect(mapStateToProps)(ChosenPresidentOptions)
