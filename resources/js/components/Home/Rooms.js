import React, {Component} from 'react';
import Notification from "../Universal/Notification";
import {messagesConfig} from "../../appSettings";

export default class Rooms extends Component {
    _isMounted = false;

    state = {
<<<<<<< HEAD
        rooms: []
    }

=======
        rooms: [],
        getMsg: messagesConfig.components.rooms,
    };
x;
    constructor(props) {
        super(props);
        this.child = React.createRef();
    };
>>>>>>> Notification system
    componentDidMount() {
        this._isMounted = true
        this.getRooms()

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

    showRooms = () => {
        return this.state.rooms.map(room => {
            return (
                <p key={room.id}>
                    {room.name}
                </p>
            )
        })
    };

    render() {
        return (
<<<<<<< HEAD
            <div className="show-rooms">
                {this.showRooms()}
=======
            <div>
                <ul>
                    {this.showRooms()}
                    <Notification onRef={ref => (this.child = ref)} />
                </ul>
>>>>>>> Notification system
            </div>
        )
    }
}
