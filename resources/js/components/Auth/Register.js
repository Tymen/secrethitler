import React, {Component} from 'react';
import {messagesConfig} from "../../appSettings";
import Notification from "../Universal/Notification";
import {Link} from "react-router-dom";

export default class Register extends Component {

    // Place in the render section

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            password_confirmation: '',
            errors: '',
            getMsg: messagesConfig.components.register,
        };

        this.child = React.createRef();

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
        axios.post('/register', {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            password_confirmation: this.state.password_confirmation,
        })
            .then(response => {
                window.location.href = '/'
            })
            .catch(error => {
                console.log(this.state.getMsg)
                if (error.response.data.errors.username) {
                    this.state.getMsg.auth.registerError.message = error.response.data.errors.username[0];
                } else if (error.response.data.errors.email) {
                    this.state.getMsg.auth.registerError.message = error.response.data.errors.email[0];
                } else if (error.response.data.errors.password) {
                    this.state.getMsg.auth.registerError.message = error.response.data.errors.password[0];
                } else {
                    this.state.getMsg.auth.registerError.message = "Something went wrong try again later!";
                }
                this.setState({
                    errors: [...this.state.errors, error]
                })
                this.child.getNotify(this.state.getMsg.auth.registerError);
            })
    }

    render() {
        return (
            <div className="container_register">
                <Notification onRef={ref => (this.child = ref)}/>
                <img className="d-none d-lg-block login-bolletjes" src="/images/login-bolletjes.svg"/>
                <div className="card-login rounded-bottom-left">
                    <h5 className="card-header-login">Register</h5>
                    <div className="card-body">
                        <div className="row">
                            <div className="col">
                                <form className="form-login" onSubmit={this.onSubmit}>
                                    <div className="form-group">
                                        <input type="text" name="username" placeholder="username"
                                               className="input-login"
                                               value={this.state.username} onChange={(e) => this.onChange(e)}/>
                                    </div>
                                    <div className="form-group">
                                        <input type="text" name="email" placeholder="E-mail Address"
                                               className="input-login"
                                               value={this.state.email} onChange={(e) => this.onChange(e)}/>
                                    </div>
                                    <div className="form-group">
                                        <input type="password" name="password" placeholder="Password..."
                                               className="input-login"
                                               value={this.state.password} onChange={(e) => this.onChange(e)}/>
                                    </div>
                                    <div className="form-group">
                                        <input type="password" name="password_confirmation"
                                               placeholder="Confirm Password..."
                                               className="input-login" value={this.state.password_confirmation}
                                               onChange={(e) => this.onChange(e)}/>
                                    </div>
                                    <div className="btn-container">
                                        <button className="btn btn-custom">Register</button>
                                        <div className="text-center text-adjustment">
                                            <p className="checking-account">Already have an account? Sign in <Link
                                                className="btn-link" to="/auth/login">
                                                here
                                            </Link>
                                            </p>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

