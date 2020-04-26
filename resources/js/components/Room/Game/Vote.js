import React, {Component} from 'react';
import {connect} from "react-redux";

class Vote extends Component {

    state = {
        voted: false
    }

    handleVote = (type) => {
        axios.post(`/api/v1/rooms/${this.props.room.id}/vote`, {
            type
        })
            .then(response => {
                this.setState({
                    voted: true
                })
            })
    }

    render() {
        if(this.state.voted){
            return (
                <div>
                    <div className="header-choose-chancellor">
                        <p>Waiting for other players to vote...</p>
                        <div className="text-center">
                            <div className="spinner-border" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        return (
            <div>
                <div className="header-choose-chancellor">
                    <div className="row">
                        <div className="col-2">
                        </div>
                        <div className="col-8">
                            <p>Do you want to vote for this party?</p>
                            <p className="under-title">(select ja or nein)</p>
                        </div>

                    </div>
                </div>


                <div className="container">
                    <div className="row">
                        <a onClick={() => this.handleVote('yes')} className="chose-cards">
                            <img src="/images/ja-card.svg"/>
                        </a>
                        <a onClick={() => this.handleVote('no')}className="chose-cards">
                            <img src="/images/nein-card.svg"/>
                        </a>
                    </div>
                </div>
            </div>

        );
    }
}

const mapStateToProps = state => {
    const {room} = state;
    return {room: room}
}
export default connect(mapStateToProps)(Vote);
