import React, {Component} from 'react';
import {Link} from "react-router-dom";
import Notification from "../Universal/Notification";
import {messagesConfig} from "../../appSettings";

export default class Rooms extends Component {
    _isMounted = false;

    state = {
        rooms: [],
        getMsg: messagesConfig.components.rooms,
    };
x;
    constructor(props) {
        super(props);
        this.child = React.createRef();
    };
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
                <div className="col-md-3">
                    <div className="col-12 background-room  ">
                    <i className="fas fa-mug-hot"></i>
                    <Link key={room.id} to={"/room/"+room.id}>
                    <p className="room-name-li">{room.name}</p>
                </Link>
                    </div>
                </div>
            )
        })
    };

    render() {
        return (
            <div>
                <div className="row">
                    {this.showRooms()}
                    <Notification onRef={ref => (this.child = ref)} />
                </div>
            </div>
        )
    }
}
