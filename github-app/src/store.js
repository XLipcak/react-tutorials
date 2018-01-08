import {createStore} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import loginReducer from "./reducers/loginReducer";

export default createStore(
    loginReducer,
    composeWithDevTools()
)