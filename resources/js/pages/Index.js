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
    state = {
        visibility: true,
    }
    showNav = () => {
        return this.state.visibility ? <Nav/> : false;
    }


    render() {
        return (
            <Router>
                {this.showNav()}
                <Switch>
                    <Route path="/" exact><Home message={this.props.message}/></Route>
                    <Route path="/rooms/:id" exact component={() =>
                        <Room setVisibility={() => this.setState({visibility: false})}/>}
                    />
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
    const element = document.getElementById('index');
    const props = Object.assign({}, element.dataset);
    ReactDOM.render(<Index {...props}/>, element);
}
