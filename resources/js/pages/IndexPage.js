import React, {Component} from 'react';
import Nav from '../components/Nav';
import Login from '../components/Login';
import Register from '../components/Register';
import Footer from '../components/Footer';
import CreateRoom from "../components/CreateRoom";

export default class IndexPage extends Component {
    render() {
        return (
            <div>
                <CreateRoom />
            </div>
        );
    }
}

