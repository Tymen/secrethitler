import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Nav from '../components/Nav';
import Login from '../components/Login';
import Register from '../components/Register';
import Footer from '../components/Footer';
import CreateRoom from "../components/CreateRoom";
import IndexPage from "./IndexPage";

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

export default class Index extends Component {
    render() {
        return (
            <Router>
                <Nav/>
                <Switch>
                    <Route path="/" exact component={IndexPage}/>
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
