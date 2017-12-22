import React from 'react'
import {UserListContainer} from "../users/UserListContainer";
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom'
import {UserDetail} from "../users/UserDetail";

//npm i react-router-dom --save-dev


const Header = () => (
    <Route path="/" render={() => (
        <div>
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
                    <Header/>
                    <Content/>
                </div>
            </Router>
        )
    }

}