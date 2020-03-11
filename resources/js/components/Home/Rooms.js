import React, {Component} from 'react';

export default class Rooms extends Component {
    state = {
        rooms: []
    }

    componentDidMount() {
        axios.get('/api/v1/rooms')
            .then(response => {
                this.setState({rooms: response.data})
            })
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
