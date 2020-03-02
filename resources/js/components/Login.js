import React, {Component} from 'react';

export default class Login extends Component {
    render() {
        return (
            <div className="container ">
                <div className="block">
                </div>

                <div className="card-login rounded-bottom-left">
                    <h5 className="card-header-login">Login</h5>
                    <div className="card-body">

                        <form className="form-login">
                            <div className="form-group">
                                <input type="text" name="email" placeholder="E-mail Address"
                                       className="input-login"/>
                            </div>
                            <div className="form-group">
                                <input type="password" name="password" placeholder="Password..."
                                       className="input-login"/>
                            </div>
                            <button className="btn btn-custom">Login</button>
                            <div className="text-center">
                                <a className="checking-account">Dont have an account? Signup here</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

