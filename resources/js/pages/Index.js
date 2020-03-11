import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Nav from '../components/Universal/Nav';
import Login from '../components/Login/Login';
import Register from '../components/Register/Register';
import Footer from '../components/Universal/Footer';
import CreateRoom from "../components/Home/CreateRoom";
import Home from "../components/Home/Home";

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';


export default class Index extends Component {

    render() {
        return (
            <Router>
                <Nav/>
                <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path="/login" exact component={Login}/>
                    <Route path="/register" exact component={Register}/>
                </Switch>
                <Footer/>
            </Router>
        );
    }
}

if (document.getElementById('index')) {
    ReactDOM.render(<Index/>, document.getElementById('index'));
}
