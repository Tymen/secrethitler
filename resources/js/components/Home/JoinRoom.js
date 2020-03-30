import React, {Component} from 'react';
import {Link} from "react-router-dom";

export default class JoinRoom extends Component {

    render() {
        return (
            <div>
                <form>
                    <div>
                        <div>
                            <input type="text" placeholder="Join Room" name="joinRoom" className="input-room-name"/>
                        </div>
                        <div>
                            <Link className="btn join-room" to="/rooms/1">Join room</Link>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

