import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Nav from '../components/Universal/Nav';
import Login from '../components/Login/Login';
import Register from '../components/Register/Register';
import Footer from '../components/Universal/Footer';

import Home from './Home';
import About from './About';
import GameRule from './GameRule';
import Room from "./Room";

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';


export default class Index extends Component {

    render() {
        return (
            <Router>
                <Nav/>
                <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path="/room/:id" exact component={Room}/>
                    <Route path="/login" exact component={Login}/>
                    <Route path="/register" exact component={Register}/>
                    <Route path="/gamerules" exact component={GameRule}/>
                    <Route path="/about" exact component={About}/>
                </Switch>
                <Footer/>
            </Router>
        );
    }
}

if (document.getElementById('index')) {
    ReactDOM.render(<Index/>, document.getElementById('index'));
}
