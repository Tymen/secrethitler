import React, {Component} from 'react';
import ChooseChancellor from './ChooseChancellor'
import {connect} from "react-redux";
import Vote from "./Vote";

class GameInteractionBlock extends Component {
    loadComponents = () => {
        const isPresident = this.props.authUser.id === this.props.room.president?.id;
        if (this.props.room.stage === 1 && isPresident) {
            return (
                <div>
                    <ChooseChancellor users={this.props.users}/>
                </div>
            )
        } else if (this.props.room.stage === 2) {
            return (
                <div>
                    <Vote/>
                </div>
            )
        } else if (this.props.room.stage === 3) {
            return (
                <div>
                    <p>stage 3</p>
                </div>
            )
        }

        else {
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
