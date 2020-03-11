import React, {Component} from 'react';

export default class Rooms extends Component {
    state = {
        rooms: []
    }

    componentDidMount() {
        axios.get('/api/v1/rooms')
            .then(response => {
                console.log(response.data)
            })
    }

    render() {
        return (
            <div>

            </div>
        )
    }
}
