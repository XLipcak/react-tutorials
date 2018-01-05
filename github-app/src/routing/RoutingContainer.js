import React from 'react'
import {UserListContainer} from "../users/UserListContainer";
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom'
import {UserDetail} from "../users/UserDetail";
import Button from "../common/Button";
import {login, logout} from "../actions";
import connect from "react-redux/es/connect/connect";

//npm i react-router-dom --save-dev


const Header = ({onLogoutClick}) => (
    <Route path="/users" render={() => (
        <div>
            <Button text='Logout' onButtonClick={onLogoutClick}/>
            <h1>
                GitHub App
            </h1>
            <hr/>
        </div>
    )}/>
)

const Content = () => (
    <div>
        <Switch>
            <Route exact path="/users" component={UserListContainer}/>
            <Route exact path="/users/:id" component={({match}) => <UserDetail id={match.params.id}/>}/>
            <Redirect to="/users"/>
        </Switch>
    </div>
)

const LoginPage = ({onLoginClick}) => (
    <div>
        <Switch>
            <Route exact path="/login" render={() => (
                <div>
                    <Button text='Login' onButtonClick={onLoginClick}/>
                </div>
            )}/>
            <Redirect to="/login"/>
        </Switch>
    </div>
)

const ProtectedPage = ({onLogoutClick}) => (
    <div>
        <Header onLogoutClick={onLogoutClick}/>
        < Content/>
    </div>
)

class RoutingContainer extends React.Component {

    render() {
        return (
            <Router>
                <div className="App">
                    {!this.props.logged ?
                        <LoginPage onLoginClick={this.props.onLoginClick}/>
                        :
                        <ProtectedPage onLogoutClick={this.props.onLogoutClick}/>
                    }
                </div>
            </Router>
        )
    }
}

const AuthRoutingContainer = connect(
    (state) => ({logged: state.logged}),
    {onLoginClick: login, onLogoutClick: logout},
)(RoutingContainer)

export default AuthRoutingContainer