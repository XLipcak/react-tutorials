import React, {Component} from 'react';
import './App.css';
import {UserListContainer} from "./containers/UserListContainer";

class App extends Component {

    render() {
        return (
            <div className="App">
                <h1>
                    GitHub Users
                </h1>
                <hr/>

                <UserListContainer/>
            </div>
        );
    }
}

export default App;
