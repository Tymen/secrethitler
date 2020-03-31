import React, {Component} from 'react';
import {Link} from "react-router-dom";
import Notification from "../Universal/Notification";
import {messagesConfig} from "../../appSettings";
import Room from "../../pages/Room";

export default class Rooms extends Component {
    _isMounted = false;

    state = {
        loggedIn: false,
        rooms: [],
        getMsg: messagesConfig.components.rooms,
    };

    constructor(props) {
        super(props);
        this.child = React.createRef();
    };
    componentDidMount() {
        axios.get('/api/v1/users/me')
            .then(response => {
                this.setState({
                    loggedIn: response.data.isAuthenticated,
                })
            });

        this._isMounted = true
        this.getRooms()

        const channel = Echo.channel('rooms-updated')
        channel.listen('.updated-rooms', () => {
            this.getRooms()
        })
    }

    getRooms = () => {
        axios.get('/api/v1/rooms')
            .then(response => {
                if (this._isMounted) {
                    this.setState({rooms: response.data.data})
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
