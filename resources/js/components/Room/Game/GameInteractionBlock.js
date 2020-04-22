import React, { Component } from 'react';
import ChooseChancellor from './ChooseChancellor'

class GameInteractionBlock extends Component {
    render() {
        return (
            <div>
                <ChooseChancellor users={this.props.users}/>
            </div>
        )
    }
}

export default GameInteractionBlock;