import React from 'react';
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import './index.css';
import loginReducer from "./reducers/loginReducer";
import {composeWithDevTools} from "redux-devtools-extension";
import App from "./App";

let store = createStore(
    loginReducer,
    composeWithDevTools()
);

render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
)
