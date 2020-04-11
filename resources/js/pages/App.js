import React, {Component} from 'react';
import Nav from '../components/Universal/Nav';
import Auth from './Auth';
import Footer from '../components/Universal/Footer';

import Home from './Home';
import Room from './Room';
import About from './About';
import GameRule from './GameRule';

import {connect} from 'react-redux'
import {setAuthUser} from '../redux/actions/users-actions';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

class App extends Component {

    componentDidMount() {
        axios.get('/api/v1/users/me')
            .then(response => {
                this.props.dispatch(setAuthUser(response.data.data))
            })
            .catch(error => {
                this.props.dispatch(setAuthUser(false))
            })
    }

    render() {
        return (
            <Router>
                <Nav/>
                <Switch>
                    <Route path="/" exact><Home/></Route>
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

export default connect()(App)
