import React, {Component} from 'react';
import Notification from "../Universal/Notification";
import {messagesConfig} from "../../appSettings";

export default class CreateRoom extends Component {

    state = {
        name: '',
        rooms: [],
        getMsg: messagesConfig.pages.home,
    }


    constructor() {
        super()
        this.child = React.createRef();
        this.onChange = this.onChange.bind(this)
        this.createRoom = this.createRoom.bind(this)
    }

    onChange(e) {
        this.setState({
            name: e.target.value
        })
    }

    createRoom(e) {
        e.preventDefault()
        axios.post('/api/v1/rooms', {
            name: this.state.name
        })
            .then(response => {

            })
            .catch(error => {
                this.child.getNotify(this.state.getMsg.auth.noLogin);
            })
    }

    render() {
        return (
            <div>
                <Notification onRef={ref => (this.child = ref)} />
                <form onSubmit={this.createRoom}>
                    <div>
                        <div>
                            <input type="text" placeholder="Create room" name="roomName" className="input-room-name"
                                   value={this.state.name}
                                   onChange={this.onChange}/>
                        </div>
                        <div>
                            <button className="btn create-room">Create room</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

