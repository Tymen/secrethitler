import React, {Component} from 'react';
import {Link} from "react-router-dom";
import Notification from "../Universal/Notification";
import {messagesConfig} from "../../appSettings";

export default class Rooms extends Component {
    _isMounted = false;

    state = {
        rooms: [],
        getMsg: messagesConfig.components.rooms,
        loggedIn: false
    };

    constructor(props) {
        super(props);
        this.child = React.createRef();
    };

    componentDidMount() {
        this._isMounted = true
        this.getRooms()
        axios.get('/api/v1/users/me').then(response => {
            this.setState({
                loggedIn: true
            })
        })

        var channel = Echo.channel('room-created')
        channel.listen('.created-room', () => {
            this.getRooms()
        })
    }

    getRooms = () => {
        axios.get('/api/v1/rooms')
            .then(response => {
                if (this._isMounted) {
                    this.setState({rooms: response.data})
                }
            })
            .catch(error => {
            this.child.getNotify(this.state.getMsg.internalServer);
        })
    };

    componentWillUnmount() {
        this._isMounted = false
    }

    checkAuth = (room) => {
        if (this.state.loggedIn) {
            return `/rooms/${room.id}`
        }
        return '/auth/login'
    }

    showRooms = () => {
        return this.state.rooms.map(room => {
            return (
                <div key={room.id} className="home-rooms">
                    <div className="col-12 background-room  ">
                        <i className="fas fa-mug-hot"></i>
                        <Link to={() => this.checkAuth(room)}>
                            <p className="room-name-li">{room.name}</p>
                        </Link>
                    </div>
                </div>
            )})}

    render() {
        return (
            <div>
                <div className="test">
                    {this.showRooms()}
                    <Notification onRef={ref => (this.child = ref)} />
                </div>
            </div>
        )
    }
}
