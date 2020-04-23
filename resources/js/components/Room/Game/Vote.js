import React, {Component} from 'react';

export default class Vote extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <a href="#1" className="chose-cards">
                        <img src="/images/ja-card.svg"/>
                    </a>
                    <a href="#2" className="chose-cards">
                        <img src="/images/nein-card.svg"/>
                    </a>
                </div>
            </div>

        );
    }
}

