import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import 'w3-css/w3.css';
import './assets/css/styles.css';
import 'react-quill/dist/quill.snow.css';
import store from './store/configureStore';

const app = (
    <Provider store={store}>
        <Routes />
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
