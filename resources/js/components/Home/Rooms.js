import React, {Component} from 'react';
import {Link} from "react-router-dom";
import Notification from "../Universal/Notification";
import {messagesConfig} from "../../appSettings";
import Room from "../../pages/Room";
import {get} from "../Universal/apiHandler";

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
                if(response.error){
                    this.child.getNotify(this.state.getMsg.internalServer);
                }else {
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
                <div className="home-rooms" key={room.id}>
                    <div className="col-12 background-room">
                        <i className="fas fa-mug-hot"></i>
                        <Link key={room.id} to="/" onClick={() => {
                            window.location.href = `/rooms/${room.id}`
                        }}>
                            <p className="room-name-li">{room.name}</p>
                        </Link>
                    </div>
                </div>
            )
        })
    }

    render() {
        return (
            <div>
                <div className="test">
                    {this.showRooms()}
                    <Notification onRef={ref => (this.child = ref)}/>
                </div>
            </div>
        )
    }
}
