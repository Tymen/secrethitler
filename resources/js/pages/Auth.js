import React, {Component} from 'react';

export default class Auth extends Component {
    componentDidMount() {
        const {match: { params } } = this.props;
        console.log(params.type);
    }

    render() {
        return (
            <div>
                <h1>Login</h1>
            </div>
        );
    }
}

