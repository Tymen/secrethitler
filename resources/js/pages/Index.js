import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Nav from '../components/Nav';
import Login from '../components/Login';
import Register from '../components/Register';
import Footer from '../components/Footer';
import Home from './Home';
import Game from './Game';
import About from './About';
import GameRule from './GameRule';
import Lobby from './Lobby';
// import Login from '../components/Home';
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
                    <Route path="/Home" exact component={Home}/>
                    <Route path="/Game" exact component={Game}/>
                    <Route path="/Gamerules" exact component={GameRule}/>
                    <Route path="/About" exact component={About}/>
                    <Route path="/Lobby" exact component={Lobby}/>
                </Switch>
                <Footer/>
            </Router>
        );
    }
}

if (document.getElementById('index')) {
    ReactDOM.render(<Index/>, document.getElementById('index'));
}
