import React, {Component} from 'react';
import {Link} from "react-router-dom";
import Notification from "../Universal/Notification";
import {messagesConfig} from "../../appSettings";
import Room from "../../pages/Room";
import {get, post} from "../Universal/apiHandler";
/*
    import {get, post} from "../Universal/apiHandler";

    <button onClick={() => {this.changeHost(1, 1)}}>clickme</button>

    changeHost = (userId, room) => {
        let roomObj = {
            newUserHost: userId,
            roomId: room,
        }
        post('/api/v1/rooms/1/changehost', roomObj)
            .then(response => {
                if(response.error){
                    console.log(response)
                    this.child.getNotify({type: "error", title: "Authentication", message: response.data});
                }else {
                    console.log(response);
                }
            })
    };
 */
export default class Rooms extends Component {
    _isMounted = false;

    state = {
        loggedIn: false,
        rooms: [],
        getMsg: messagesConfig.components.rooms,
    };

    constructor(props) {
        super(props);
        this.request = React.createRef();
        this.child = React.createRef();
    };


    componentDidMount() {
        if (document.getElementById('index').dataset.message) {
            this.child.getNotify({type: "error", title: "Room", message: document.getElementById('index').dataset.message});
        }
        this._isMounted = true;
        get('api/v1/users/me').then(response => {
            return (response.data) ? this.setState({loggedIn: true}) : this.setState({loggedIn: false})
        });

        this.getRooms();

        const channel = Echo.channel('rooms-updated')
        channel.listen('.updated-rooms', () => {
            this.getRooms()
        })
    }

    getRooms = () => {
        get('/api/v1/rooms')
            .then(response => {
                if (response.error) {
                    this.child.getNotify(this.state.getMsg.internalServer);
                } else {

                    this.setState({rooms: response.data});
                }
            })
    };

    componentWillUnmount() {
        this._isMounted = false
    }

    showRooms = () => {
        return this.state.rooms.map(room => {

            return (
                <div className="home-rooms" key={room.id} onClick={() => window.location.href = `/rooms/${room.id}`}>
                    <div className="col background-room">
                        <i className="fas fa-mug-hot"></i>

                        <p className="room-name-li">{room.name}</p>
                    </div>
                </div>
            )
        })
    }

    render() {
        return (
            <div>
                <div className="test text-center">
                    {this.showRooms()}
                    <Notification onRef={ref => (this.child = ref)}/>
                </div>
            </div>
        )
    }
}
