import React from 'react'
import {UserListContainer} from "../users/UserListContainer";
import {BrowserRouter as Router, Redirect, Route, Switch, withRouter} from 'react-router-dom'
import {UserDetail} from "../users/UserDetail";
import {login, logout} from "../actions";
import connect from "react-redux/es/connect/connect";
import Login from "../common/Login";
import {fakeAuth} from "../service/authService";

const Header = () => (
    <Route path="/users" render={() => (
        <div>
            <div className="login-box">
                <SignOutButton/>
            </div>

            <h1>
                GitHub App
            </h1>
            <hr/>
        </div>
    )}/>
)


const Content = () => (
    <div>
        <Header/>
        <div>
            <Switch>
                <Route exact path="/users" component={UserListContainer}/>
                <Route exact path="/users/:id" component={({match}) => <UserDetail id={match.params.id}/>}/>
                <Redirect to="/users"/>
            </Switch>
        </div>
    </div>
)

const SignOutButton = withRouter(({history}) => (
    <button onClick={() => {
        fakeAuth.signout(() => history.push('/'))
    }}>Sign out</button>
))


const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={(props) => (
        props.isAuthenticated === true
            ? <Component {...props} />
            : <Redirect to={{
                pathname: '/login',
                state: {from: props.location}
            }}/>
    )}/>
)


class RoutingContainer extends React.Component {

    render() {
        console.log('rerendering')
        return (
            <Router>
                <div className="App">
                    <Switch>
                        <Route path="/login" render={(props) => <Login onLoginClick={this.props.onLoginClick} {...props}/>}/>
                        <PrivateRoute {...this.props} path='/' component={Content}/>
                    </Switch>
                </div>
            </Router>
        )
    }
}

const ConnectedRoutingContainer = connect(
    (state) => ({isAuthenticated: state.isAuthenticated}),
    {onLoginClick: login, onLogoutClick: logout},
)(RoutingContainer)

export default ConnectedRoutingContainer