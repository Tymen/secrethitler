import React, { Component } from 'react';
import ChooseChancellor from './ChooseChancellor'

class GameInteractionBlock extends Component {
    state= {
        headerText: ''
    }

    loadComponents = () => {
        if (ChooseChancellor){
            this.setState({
                headerText: 'Choose one of the players to be the chancellor'
            })
        } else {
            this.setState({
                headerText: 'No component is loaded!'
            })
        }
    }
    render() {
        return (
            <div>
                <div className="header-choose-chancellor"><p>{this.state.headerText}</p></div>
                <ChooseChancellor users={this.props.users}/>
            </div>
        )
    }
}

export default GameInteractionBlock;