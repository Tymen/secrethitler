import React, {Component} from 'react';

export default class JoinRoom extends Component {

    render() {
        return (
            <div>
                <form>
                    <div>
                        <div>
                            <input type="text" placeholder="join Room" name="joinRoom" className="input-room-name"/>
                        </div>
                        <div>
                            <button className="btn join-room">Join room</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

