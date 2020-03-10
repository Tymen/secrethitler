import React, {Component} from 'react';

export default class CreateRoom extends Component {

    state = {
        name: '',
        rooms: []
    }

    constructor(){
        super()

        this.onChange = this.onChange.bind(this)
        this.createRoom = this.createRoom.bind(this)
    }

    onChange(e){
        this.setState({
            name: e.target.value
        })
    }

    createRoom(e){
        e.preventDefault()
        axios.post('/api/v1/rooms',{
            name: this.state.name
        })
            .then(response =>{

            })
            .catch(error => {

            })
    }

    render() {
        return (
            <div className="container">
                <form onSubmit={this.createRoom}>
                    <input type="text" placeholder="Create room" name="roomName" value={this.state.name} onChange={this.onChange}/>
                    <button>Create room</button>
                </form>
            </div>
        );
    }
}

