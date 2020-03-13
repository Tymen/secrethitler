import React, {Component} from 'react';
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";

export default class Auth extends Component {
    state = {
        type: ''
    }

    componentDidMount() {
        const {match: { params } } = this.props;
        this.setState({
            type: params.type
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {match: { params } } = this.props;

        prevState.type !== params.type ? this.setState({type: params.type}) : false;
    }

    render() {
        if (this.state.type === 'login') {
            return <Login/>
        }
        return <Register/>
    }
}

