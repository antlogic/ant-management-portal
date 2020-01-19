import React from 'react'
import ReactDOM from 'react-dom'
import './assets/stylesheets/main.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css';
import Page from "./containers/Page/Page";
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import reducer from "./store/reducers/reducer";
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(
    applyMiddleware(thunk)
));

ReactDOM.render(
        <Provider store={store} >
            <Page />
        </Provider>, document.getElementById('root'))
