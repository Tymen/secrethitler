import React, {Component} from 'react';

export default class CreateRoom extends Component {
    render() {
        return (
            <div className="container">
                <form>
                    <input type="text" placeholder="Create room"/>
                    <button>Create room</button>
                </form>
            </div>
        );
    }
}

