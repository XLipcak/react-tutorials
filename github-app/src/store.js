import {createStore, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension';
import loginReducer from "./reducers/loginReducer";
import {combineReducers} from 'redux';
import {fetchingReducer} from "./reducers/fetchingReducer";
import thunk from 'redux-thunk';
import {reducer as formReducer} from 'redux-form';

export default createStore(
    combineReducers({login: loginReducer, isFetching: fetchingReducer, form: formReducer}),
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)