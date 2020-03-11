import React, {Component} from 'react';

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
            <div className="container ">
                <div className="block">
                </div>

                <div className="card-login rounded-bottom-left">
                    <h5 className="card-header-login">Login</h5>
                    <div className="card-body">

                        <form className="form-login" onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <input type="text" name="email" placeholder="E-mail Address" value={this.state.email} onChange={ (e) => this.onChange(e)}
                                       className="input-login"/>
                            </div>
                            <div className="form-group">
                                <input type="password" name="password" placeholder="Password..." value={this.state.password} onChange={ (e) => this.onChange(e)}
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

