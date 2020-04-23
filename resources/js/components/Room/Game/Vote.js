import React, {Component} from 'react';

export default class Vote extends Component {
    render() {
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
                        <a href="#1" className="chose-cards">
                            <img src="/images/ja-card.svg"/>
                        </a>
                        <a href="#2" className="chose-cards">
                            <img src="/images/nein-card.svg"/>
                        </a>
                    </div>
                </div>
            </div>

        );
    }
}

