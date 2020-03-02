import React, {Component} from 'react';

export default class Register extends Component {
    render() {
        return (
            <div className="container">
                <div className="block">
                </div>
                <div className="card-login rounded-bottom-left">
                    <h5 className="card-header-login">Register</h5>
                    <div className="card-body">

                        <form className="form-login">
                            <div className="form-group">
                                <input type="text" name="username" placeholder="username" className="input-login"/>
                            </div>
                            <div className="form-group">
                                <input type="text" name="email" placeholder="E-mail Adress" className="input-login"/>
                            </div>
                            <div className="form-group">
                                <input type="password" name="password" placeholder="Password..." className="input-login"/>
                            </div>
                            <div className="form-group">
                                <input type="password" name="confirmPassword" placeholder="Confirm Password..." className="input-login"/>
                            </div>
                            <button className="btn btn-custom">Register</button>
                            <div className="text-center">
                                <a className="checking-account">Already have an account? Sign in</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

