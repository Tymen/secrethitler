import React, {Component} from 'react';

export default class Lobby extends Component {
    render() {
        return (
            <div>
                <button onClick={() => this.props.setActive()}>Start game!</button>
            </div>
        );
    }
}

