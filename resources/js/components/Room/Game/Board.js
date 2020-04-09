import React, {Component} from 'react';

export default class Board extends Component {

    render() {
        return (
            <div>
                <img className="facist-board" src="/images/facist-board.png"/>
                <img className="liberal-board" src="/images/liberal-board.png"/>
            </div>
        );
    }
}
