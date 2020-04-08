import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import {Provider} from 'react-redux'
import {store} from "../redux/store";
import App from "./App";

export default class Index extends Component {
    render() {
        return (
            <Provider store={store}>
                <App/>
            </Provider>
        );
    }
}

if (document.getElementById('index')) {
    const element = document.getElementById('index');
    const props = Object.assign({}, element.dataset);
    ReactDOM.render(<Index {...props}/>, element);
}
