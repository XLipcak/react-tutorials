import React from 'react';
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import './index.css';
import App from './App';
import loginReducer from "./reducers/loginReducer";

let store = createStore(loginReducer);

render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
)
