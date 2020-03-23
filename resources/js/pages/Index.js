import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Nav from '../components/Universal/Nav';
import Auth from "./Auth";
import Footer from '../components/Universal/Footer';

import Home from './Home';
import About from './About';
import GameRule from './GameRule';
import Room from "./Room";

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

export default class Index extends Component {
    componentDidMount() {
        window.leaveRoom = async (id) => {
            await axios.post(`/api/v1/rooms/${id}/leave`);
            await Echo.leave(`room.${id}`);

            window.location.href = '/'
        };
    }

    render() {
        return (
            <Router>
                <Nav/>
                <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path="/rooms/:id" exact component={Room}/>
                    <Route path="/auth/:type" exact component={Auth}/>
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
