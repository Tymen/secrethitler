import React, {Component} from 'react';

export default class Game extends Component {
    render() {
        return (
            <div>
                <h1>Game has started</h1>
                <button onClick={() => this.props.setInactive()}>Inactive</button>
            </div>
        );
    }
}


