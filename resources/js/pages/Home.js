import React, {Component} from 'react';
import Rooms from "../components/Home/Rooms";
import CreateRoom from "../components/Home/CreateRoom";

export default class Home extends Component {
    render() {
        return (
            <div>
                <h1>Home</h1>
                <CreateRoom/>
                <Rooms/>
            </div>
        );
    }
}

