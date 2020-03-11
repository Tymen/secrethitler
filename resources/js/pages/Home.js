import React, {Component} from 'react';
import JoinRoom from "../components/Home/JoinRoom";
import CreateRoom from "../components/Home/CreateRoom";
import Rooms from "../components/Home/Rooms"
import { messagesConfig } from "../appSettings";

export default class Home extends Component {
    state = {
        error: true,
        getMsg: messagesConfig.pages.home
    }
    errorMSG = () => {
        if(this.state.error) {
            return (
                <div className="alert alert-danger" role="alert">
                    {this.state.getMsg.auth.noLogin}
                </div>
            )
        }
    };
    ifError = () => {
        if(this.state.error){
            this.setState({error: false})
        }else {
            this.setState({error: true})
        }
    };
    render() {
        return (
            <div className="container">
                {this.errorMSG()}
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

