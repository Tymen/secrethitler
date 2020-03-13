import React, {Component} from 'react';
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";

export default class Auth extends Component {
    state = {
        type: '',
    }
    componentDidMount() {
        const {match: { params } } = this.props;
        this.setState({type:params.type})
    }

    render() {
        if (this.state.type === 'login'){
            return <Login/>;
        }
        return <Register/>;
    }
}

