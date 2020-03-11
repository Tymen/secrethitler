import React, {Component} from 'react';
import JoinRoom from "../Home/JoinRoom";
import CreateRoom from "../Home/CreateRoom";
import Rooms from "../Home/Rooms"

export default class Home extends Component {

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-4 offset-2 text-center">
                        <JoinRoom/>

                    </div>
                    <div className="col-4 text-center">
                        <CreateRoom/>

                    </div>
                </div>
                <div className="row">
                    <div className="card">
                        <div class="card-header">
                            Featured
                        </div>
                        <div className="card-body">
                            <Rooms/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

