import React, {Component} from 'react';
import {Link} from "react-router-dom";

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errors: []
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    onSubmit(e) {
        e.preventDefault();
        axios.post('/login', {
            email: this.state.email,
            password: this.state.password,
        })
            .then(response => {
                window.location.href = '/'
            })
            .catch(error => {
                this.setState({
                    errors: [...this.state.errors, error]
                })
            })
    }


    render() {
        return (
            <div className="container_login ">
                <div className="block">
                </div>

                <div className="card-login rounded-bottom-left">
                    <h5 className="card-header-login">Login</h5>
                    <div className="card-body">
                        <div className="row">
                            <div className="col">
                                <form className="form-login" onSubmit={this.onSubmit}>
                                    <div className="form-group">
                                        <input type="text" name="email" placeholder="E-mail Address"
                                               value={this.state.email} onChange={(e) => this.onChange(e)}
                                               className="input-login"/>
                                    </div>
                                    <div className="form-group">
                                        <input type="password" name="password" placeholder="Password..."
                                               value={this.state.password} onChange={(e) => this.onChange(e)}
                                               className="input-login"/>
                                    </div>
                                    <div className="btn-container">
                                        <button className="btn btn-custom">Login</button>
                                        <div className="text-center text-adjustment">
                                            <p className="checking-account">Dont have an account? Signup <Link
                                                className="btn-link" to="/auth/register">
                                                here
                                            </Link>
                                            </p>

                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="col">

                            </div>
                        </div>

                        <div className="row">
                            <div className="col">

                            </div>
                        </div>
                    </div>
                </div>

                <div className="box box-container">
                    <div className="row">
                        <div className="col">
                            <div></div>
                        </div>
                        <div className="box_2"></div>
                    </div>
                </div>
            </div>
        );
    }
}

