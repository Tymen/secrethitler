import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class Nav extends Component {

    state = {
        loggedIn: false,
        loaded: false

    }
    componentDidMount() {
        axios.get('api/v1/users/me')
            .then(response => {
                this.setState({
                    loggedIn: response.data,
                    loaded: true
                })
            })
            .catch(error => {
                this.setState({
                    loaded: true
                })
            })
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
                    <Link className="nav-item" to="/login">
                        <li className="nav-link">Login</li>
                    </Link>
                    <Link className="nav-item" to="/register">
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
                            aria-expanded="false" aria-label="Toggle navigation">>
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <Link className="navbar-brand" to="/">
                                <li className="nav-link ">Logo</li>
                            </Link>
                        </ul>
                        <ul className="navbar-nav ml-auto">
                            <Link className="nav-item" to="/game">
                                <li className="nav-link">Game</li>
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

