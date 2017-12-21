import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    NavLink
} from 'react-router-dom'
import './App.css'


const isActiveFunc = (match, location) => {
    console.log(match, location)
    return match
}

const Links = () => (
    <nav>
        <NavLink exact activeClassName="active" to="/">Home</NavLink>
        <NavLink activeClassName="active" to={{pathname: '/about'}}>About</NavLink>
        <NavLink
            isActive={isActiveFunc}
            activeClassName="active" replace to="/contact">Contact</NavLink>
    </nav>
)

const App = () => (
    <Router>
        <div>
            <Links/>
            <Route path="/:a?/:b(\d+)?" render={({match}) => (
                <h1>
                    Page: {match.params.a || 'Home'}
                    <br/>
                    Subpage: {match.params.b || 'Home'}
                </h1>
            )}/>

            <br/>

            <Route exact path="/" render={() => <h1>Home</h1>}/>
            <Route path="/about" render={() => <h1>About</h1>}/>
            <Route path="/contact" render={() => <h1>Contact</h1>}/>
        </div>
    </Router>
)

export default App
