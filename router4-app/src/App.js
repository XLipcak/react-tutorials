import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
    NavLink,
    Switch,
    Prompt,
    Redirect
} from 'react-router-dom'
import './App.css'


const isActiveFunc = (match, location) => {
    console.log(match, location)
    return match
}

const loggedin = true;

const Links = () => (
    <nav>
        <Link to="/menu">Menu</Link>
        <Link to="/?id=123">UrlParam1</Link>
        <Link to={{pathname: '/', search: 'id=456'}}>UrlParam2</Link>
        <NavLink exact activeClassName="active" to="/">Home</NavLink>
        <NavLink activeClassName="active" to={{pathname: '/about'}}>About</NavLink>
        <NavLink
            isActive={isActiveFunc}
            activeClassName="active" replace to="/contact">Contact</NavLink>

        <Link to="/nowhere">Link to nowhere</Link>

        <Link to="/redirect">Redirect</Link>

        <Link to="/param-redirect/777">Param redirect</Link>

        <Link to="/protected">Protected</Link>

        <Link to="/form">Form</Link>

    </nav>
)

const Menu = () => (
    <div>
        <h1>Menu</h1>
        <Link to="/menu/food">Food</Link>
        <Link to="/menu/drins">Drinks</Link>
        <Link to="/menu/123">Sides</Link>
        <Route
            path="/menu/:section"
            render={({match}) => <h2>{match.params.section}</h2>}
        />

    </div>
)

const Header = ({match}) => (
    <div className="header">

        {/*<switch> matches only first route*/}
        <Switch>
            {/*<Route path="/:a?/:b(\d+)?" render={({match}) => (*/}
            {/*<h1>*/}
            {/*Page: {match.params.a || 'Home'}*/}
            {/*<br/>*/}
            {/*Subpage: {match.params.b || 'Home'}*/}
            {/*</h1>*/}
            {/*)}/>*/}

            <Route exact path="/" render={() => <h1>Home</h1>}/>
            <Route path="/about" render={() => <h1>About</h1>}/>
            <Route path="/contact" render={() => <h1>Contact</h1>}/>

            <Route path="/redirect" render={() => (
                <Redirect to="/red"/>
            )}/>

            <Redirect from="/nowhere" to="/menu"/>

            <Route path="/param-redirect/:str" render={({match}) => (
                <Redirect to={`/rr/${match.params.str}`}/>
            )}/>

            <Route path="/protected" render={() => (
                loggedin
                    ? <h1>Welcome to the protected page</h1>
                    : <Redirect to="/new/Login"/>
            )}/>

            <Route path="/form" component={Form}/>

        </Switch>
    </div>
)

const Content = ({match}) => (
    <div className="content">
        <Route path="/" render={({match, location}) => (
            <div>
                <p>{JSON.stringify(match)}</p>
                <p>{JSON.stringify(location)}</p>
                <p>{new URLSearchParams(location.search).get('id')}</p>
            </div>
        )}/>

        <Route path="/menu" component={Menu}/>
        <Route path="/:itemid" render={({match}) => <h1>Item: {match.params.itemid}</h1>}/>
    </div>
)

class Form extends React.Component {
    state = {dirty: false}
    setDirty = () => this.setState({dirty: true})

    render() {
        return (
            <div>
                <h1>Form</h1>
                <input type="text" onInput={this.setDirty}/>
                <Prompt
                    when={this.state.dirty}
                    message="Data will be lost!"
                />
            </div>
        )
    }
}


const App = () => (
    <Router>
        <div>
            <Links/>
            <Header/>
            <Content/>

        </div>
    </Router>
)

export default App
