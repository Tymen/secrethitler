import React, {Component} from 'react';

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
                <li key={room.id}>
                    {room.name}
                </li>
            )
        })
    }

    render() {
        return (
            <div>
                <ul>
                    {this.showRooms()}
                </ul>
            </div>
        )
    }
}
