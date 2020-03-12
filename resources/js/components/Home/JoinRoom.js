import React, {Component} from 'react';

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
                            <link className="btn join-room">Join room</link>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

