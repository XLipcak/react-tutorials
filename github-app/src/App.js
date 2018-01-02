import React from 'react';
import './App.css';
import {connect} from 'react-redux'
import {RoutingContainer} from "./routing/RoutingContainer";
import {login, logout} from "./actions";


const AuthContainer = ({...rest}) => (
    <RoutingContainer {...rest}/>
)

const mapStateToProps = state => {
    return {
        logged: state.logged
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLoginClick: () => dispatch(login()),
        onLogoutClick: () => dispatch(logout())
    }
}

const App = connect(
    mapStateToProps,
    mapDispatchToProps
)(AuthContainer)

export default App