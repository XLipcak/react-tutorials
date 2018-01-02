import React from 'react'
import {UserListContainer} from "../users/UserListContainer";
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom'
import {UserDetail} from "../users/UserDetail";
import Button from "../common/Button";

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

export class RoutingContainer extends React.Component {

    render() {
        return (
            <Router>
                <div className="App">
                    {!this.props.logged ?
                        <div>
                            <Switch>
                                <Route exact path="/login" render={() => (
                                    <div>
                                        <Button text='Login' onButtonClick={this.props.onLoginClick}/>
                                    </div>
                                )}/>
                                <Redirect to="/login"/>
                            </Switch>
                        </div>
                        :
                        <div>
                            <Header onLogoutClick={this.props.onLogoutClick}/>
                            < Content/>
                        </div>
                    }
                </div>
            </Router>
        )
    }

}