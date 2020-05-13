import React, {Component} from 'react';
import ChooseChancellor from './ChooseChancellor'
import {connect} from "react-redux";
import Vote from "./Vote";
import PresidentTruthBluff from "./PresidentTruthBluff";
import ChancellorTruthBluff from "./ChancellorTruthBluff";

class GameInteractionBlock extends Component {
    loadComponents = () => {
        const isPresident = this.props.authUser.id === this.props.room.president.id;
        const stage = this.props.room.stage;

        switch (true) {
            case stage === 1 && isPresident:
                return <ChooseChancellor users={this.props.users}/>;
            case stage === 2:
                return <Vote/>;
            case stage === 3 && isPresident:
                return <p>President policy</p>;
            case stage === 4:
                return <p>Chancellor policy</p>;
            case stage === 5 && isPresident:
                return <PresidentTruthBluff/>;
            case stage === 6:
                return <ChancellorTruthBluff/>;
            default:
                return (
                    <div>
                        <div className="header-choose-chancellor">
                            <p>Waiting for an action...</p>
                            <div className="text-center">
                                <div className="spinner-border" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )
        }
    }

    render() {
        return this.loadComponents()
    }
}

const mapStateToProps = state => {
    const {room, users} = state;
    return {room: room, authUser: users.authUser}
}
export default connect(mapStateToProps)(GameInteractionBlock);
