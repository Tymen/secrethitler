import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {store} from "../../redux/store";
import {connect} from 'react-redux'

class Nav extends Component {
    authCheck() {
        if (this.props.authUser) {
            return (
                <div>
                    <Link className="nav-item" to="/"
                          onClick={() => axios.post('/logout').then(response => {
                              window.location.href = '/'
                          })}>
                        <li className="nav-link">Logout</li>
                    </Link>
                </div>
            )
        }
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

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-custom">
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <Link className="nav-item" to="/">
                            <li className="nav-link">Home</li>
                        </Link>
                    </ul>
                    <ul className="navbar-nav ml-auto">
                        <Link className="nav-item" to="/gamerules">
                            <li className="nav-link">Gamerules</li>
                        </Link>
                        <Link className="nav-item" to="/about">
                            <li className="nav-link">About</li>
                        </Link>
                        <span className="text-center">{this.authCheck()}</span>
                    </ul>

                </div>
            </nav>
        );
    }
}

const mapStateToProps = state => {
    const { users } = state
    return { authUser: users.authUser }
}

export default connect(mapStateToProps)(Nav)



