import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
    NavLink,
    Switch
} from 'react-router-dom'
import './App.css'


const isActiveFunc = (match, location) => {
    console.log(match, location)
    return match
}

const Links = () => (
    <nav>
        <Link to="/?id=123">UrlParam1</Link>
        <Link to={{pathname: '/', search: 'id=456'}}>UrlParam2</Link>
        <NavLink exact activeClassName="active" to="/">Home</NavLink>
        <NavLink activeClassName="active" to={{pathname: '/about'}}>About</NavLink>
        <NavLink
            isActive={isActiveFunc}
            activeClassName="active" replace to="/contact">Contact</NavLink>

        <Link to="/nowhere">Link to nowhere</Link>

    </nav>
)

const App = () => (
    <Router>
        <div>
            <Links/>

            {/*<switch> matches only first route*/}

            <Route path="/:a?/:b(\d+)?" render={({match}) => (
                <h1>
                    Page: {match.params.a || 'Home'}
                    <br/>
                    Subpage: {match.params.b || 'Home'}
                </h1>
            )}/>

            <br/>

            <Route path="/" render={() => <h1>Home</h1>}/>
            <Route path="/about" render={() => <h1>About</h1>}/>
            <Route path="/contact" render={() => <h1>Contact</h1>}/>

            <br/>

            <Route path="/" render={({match, location}) => (
                <div>
                    <p>{JSON.stringify(match)}</p>
                    <p>{JSON.stringify(location)}</p>
                    <p>{new URLSearchParams(location.search).get('id')}</p>
                </div>
            )}/>

            <Route render={() => <h1>Page not found</h1>}/>

        </div>
    </Router>
)

export default App
