import React, {Component} from 'react';

export default class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            errors: ''
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
        axios.post('/register', {
            username: this.state.username,
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
            <div className="container">
                <div className="block">
                </div>
                <div className="card-login rounded-bottom-left">
                    <h5 className="card-header-login">Register</h5>
                    <div className="card-body">

                        <form className="form-login" onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <input type="text" name="username" placeholder="username" className="input-login"
                                       value={this.state.username} onChange={(e) => this.onChange(e)}/>
                            </div>
                            <div className="form-group">
                                <input type="text" name="email" placeholder="E-mail Address" className="input-login"
                                       value={this.state.email} onChange={(e) => this.onChange(e)}/>
                            </div>
                            <div className="form-group">
                                <input type="password" name="password" placeholder="Password..." className="input-login"
                                       value={this.state.password} onChange={(e) => this.onChange(e)}/>
                            </div>
                            <div className="form-group">
                                <input type="password" name="confirmPassword" placeholder="Confirm Password..."
                                       className="input-login"/>
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

