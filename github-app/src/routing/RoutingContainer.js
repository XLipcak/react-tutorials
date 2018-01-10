import React from 'react'
import {UserListContainer} from "../users/UserListContainer";
import {BrowserRouter as Router, Redirect, Route, Switch, withRouter} from 'react-router-dom'
import {UserDetail} from "../users/UserDetail";
import {login, logout} from "../actions";
import connect from "react-redux/es/connect/connect";
import Login from "../common/Login";
import Link from "react-router-dom/es/Link";


const spanStyle = {
    color: 'blue',
    margin: '10px'
};

const Header = (props) => (
    <Route path="/users" render={() => (
        <div>
            <div className="login-box">
                <SignOutButton {...props} />
                <Link to="/users">
                    <span style={spanStyle}>
                        Home
                    </span>
                </Link>
            </div>

            <h1>
                GitHub App
            </h1>
            <hr/>
        </div>
    )}/>
)


const Content = (props) => (
    <div>
        <Header {...props}/>
        <div>
            <Switch>
                <Route exact path="/users" component={UserListContainer}/>
                <Route exact path="/users/:id" component={({match}) => <UserDetail id={match.params.id}/>}/>
                <Redirect to="/users"/>
            </Switch>
        </div>
    </div>
)

const SignOutButton = withRouter(({history, logout}) => (
    <button onClick={() => {
        logout(() => history.push('/'))
    }}>Sign out</button>
))


const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={(props) => (
        rest.isAuthenticated === true
            ? <Component {...props} {...rest} />
            : <Redirect to={{
                pathname: '/login',
                state: {from: props.location}
            }}/>
    )}/>
)


class RoutingContainer extends React.Component {

    render() {
        return (
            <Router>
                <div className="App">
                    <Switch>
                        <Route path="/login" render={(props) => <Login {...this.props} {...props}/>}/>
                        <PrivateRoute {...this.props} path='/' component={Content}/>
                    </Switch>
                </div>
            </Router>
        )
    }
}

const ConnectedRoutingContainer = connect(
    (state) => ({isAuthenticated: state.login.isAuthenticated, isFetching: state.isFetching}),
    {login, logout},
)(RoutingContainer)

export default ConnectedRoutingContainer