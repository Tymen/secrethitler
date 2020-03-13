import React, {Component} from 'react';
import JoinRoom from "../components/Home/JoinRoom";
import CreateRoom from "../components/Home/CreateRoom";
import Rooms from "../components/Home/Rooms"
import { messagesConfig } from "../appSettings";
import Notification from "../components/Universal/Notification";
export default class Home extends Component {
    state = {
        getMsg: messagesConfig.pages.home,
    };
    constructor(props) {
        super(props);
        this.child = React.createRef();
    };
    notify = () => {
        this.child.getNotify(this.state.getMsg.auth.noLogin);
    };
    render() {
        return (
            <div className="container">
                <Notification onRef={ref => (this.child = ref)} />
                <button onClick={this.notify}>Child.method()</button>
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
                        <div className="card-header">
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

