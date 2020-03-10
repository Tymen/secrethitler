import React, {Component} from 'react';
import Nav from '../components/Nav';
import Login from '../components/Login';
import Register from '../components/Register';
import Footer from '../components/Footer';
import CreateRoom from "../components/CreateRoom";

export default class Home extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-4 offset-2 text-center">
                        <CreateRoom/>
                    </div>
                </div>
            </div>
        );
    }
}

