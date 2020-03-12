import React, {Component} from 'react';
import {Link} from "react-router-dom";

export default class Rooms extends Component {
    _isMounted = false

    state = {
        rooms: []
    }

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
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    showRooms = () => {
        return this.state.rooms.map(room => {
            return (
                // <a key={room.id} className="room-p">
                //     {room.name}
                // </a>

                <Link className="" to={"/"+room.id}>
                    <li className="room-name-li">{room.name}</li>
                </Link>
            )
        })
    }

    render() {
        return (
            <div className="show-rooms">
                {this.showRooms()}
            </div>
        )
    }
}
