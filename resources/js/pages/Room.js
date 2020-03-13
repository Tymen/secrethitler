import React, {Component} from 'react';
import Game from "../components/Room/Game";
import Lobby from "../components/Room/Lobby";

export default class Room extends Component {

    state = {
        users: [],
        active: false
    }

    componentDidMount() {
        this.getActive()
        Echo.join('room.' + this.props.match.params.id)
            .here((users) => {
                console.log(users)
            })
            .joining((user) => {
                // this.setState({
                //     users: user
                // })
                console.log(user.name)
            })
            .leaving((user) => {
                // this.setState({
                //     users: user
                // })
                console.log(user.name)
            })
    }


    getActive = () => {

    }

    setActive = () => {
        this.setState({
            active: true
        })
    }

    render() {
        if (this.state.active) {
            return <Game/>
        }
        return <Lobby setActive={() => this.setActive()}/>


    }
}

