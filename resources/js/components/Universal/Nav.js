import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class Nav extends Component {

    _isMounted = false;

    state = {
        loggedIn: false,
        loaded: false

    }

    componentDidMount() {
        this._isMounted = true
        axios.get('/api/v1/users/me')
            .then(response => {
                if (this._isMounted) {
                    this.setState({
                        loggedIn: response.data,
                        loaded: true
                    })
                }
            })
            .catch(error => {
                if (this._isMounted) {
                    this.setState({
                        loaded: true
                    })
                }
            })
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    authCheck() {
        if (this.state.loggedIn) {
            return (
                <div>
                    <Link className="nav-item" to="/">
                        <li className="nav-link"
                            onClick={() => axios.post('/logout').then(response => {
                                window.location.href = '/'
                            })}>Logout
                        </li>
                    </Link>
                </div>
            )
        } else {
            return (
                <div>
                    <Link className="nav-item" to="/auth/login">
                        <li className="nav-link">Login</li>
                    </Link>
                    <Link className="nav-item" to="/auth/register">
                        <li className="nav-link">Register</li>
                    </Link>
                </div>
            )
        }
    }

    render() {
        if (this.state.loaded) {
            return (
                <nav className="navbar navbar-expand-lg navbar-dark bg-custom">
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <Link className="navbar-brand" to="/">
                                <li className="navbar-logo"><img src="images/Secrethitler-no-bg.png"></img></li>
                            </Link>
                        </ul>
                        <ul className="navbar-nav ml-auto">
                            <Link className="nav-item" to="/gamerules">
                                <li className="nav-link">Gamerules</li>
                            </Link>
                            <Link className="nav-item" to="/profile">
                                <li className="nav-link">Profile</li>
                            </Link>
                            <Link className="nav-item" to="/about">
                                <li className="nav-link">About</li>
                            </Link>
                            {this.authCheck()}
                        </ul>

                    </div>
                </nav>
            );
        } else {
            return (
                <div></div>
            )
        }
    }
}

