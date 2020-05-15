import React, {Component} from 'react';
import {connect} from "react-redux";

export default class Board extends Component {

    render() {
        return (
            <div>
                <img className="img-fluid" src={"/images/board/liberal-" + this.props.liberal + ".jpg"}/>
                <img className="img-fluid" src={"/images/board/fascist-" + this.props.fascist + ".jpg"}/>
            </div>
        );
    }
}
