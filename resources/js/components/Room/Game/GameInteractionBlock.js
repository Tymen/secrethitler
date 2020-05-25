import React, {Component} from 'react';
import ChooseChancellor from './ChooseChancellor'
import {connect} from "react-redux";
import Vote from "./Vote";
import PresidentTruthBluff from "./PresidentTruthBluff";
import ChancellorTruthBluff from "./ChancellorTruthBluff";
import ChosenPresidentOptions from "./ChosenPresidentOptions";
import ChosenChancellorOptions from "./ChosenChancellorOptions"
import ChoosePolicy from "./ChoosePolicy";
import ChooseRole from "./ChooseRole";
import KillAPlayer from "./KillAPlayer";
import SeePolicies from "./SeePolicies";
import SelectNextPresident from "./SelectNextPresident";

class GameInteractionBlock extends Component {
    loadComponents = () => {
        const isPresident = this.props.authUser.id === this.props.room.president?.id;
        const isChancellor = this.props.authUser.id === this.props.room.chancellor?.id;
        const isKilled = this.props.authUser.isKilled;
        const stage = this.props.room.stage;
        switch (true) {
            case stage === 1 && isPresident:
                return <ChooseChancellor/>;
            case stage === 2 && !isKilled:
                return <Vote/>;
            case stage === 3 && isPresident && !isKilled:
                return <ChoosePolicy/>;
            case stage === 4 && isChancellor && !isKilled:
                return <ChoosePolicy/>;
            case stage === 5 && isPresident && !isKilled:
                return <PresidentTruthBluff/>;
            case stage === 6:
                return <ChosenPresidentOptions/>;
            case stage === 7 && isChancellor && !isKilled:
                return <ChancellorTruthBluff/>;
            case stage === 8:
                return <ChosenChancellorOptions/>;
            case stage === 9 && isPresident:
                return <SeePolicies/>;
            case stage === 10 && isPresident:
                return <ChooseRole users={this.props.users}/>;
            case stage === 11 && isPresident && !isKilled:
                return <SelectNextPresident/>;
            case stage === 12 && isPresident && !isKilled:
                return <KillAPlayer/>;
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
    return {room: room, authUser: users.authUser, users: users.users}
}
export default connect(mapStateToProps)(GameInteractionBlock);
