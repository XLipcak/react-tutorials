import React from "react";
import Redirect from "react-router-dom/es/Redirect";
import Link from "react-router-dom/es/Link";

class Login extends React.Component {
    state = {
        redirectToReferrer: false
    }


    // login = () => {
    //     this.props.fakeAuth.authenticate(() => {
    //         this.setState({redirectToReferrer: true})
    //     })
    // }

    render() {
        const {from} = this.props.location.state || {from: {pathname: '/'}}
        const {redirectToReferrer} = this.state

        if (redirectToReferrer) {
            return (
                <Redirect to={from}/>
            )
        }

        return (
            <div>
                <p>You must log in to view the page at {from.pathname}</p>
                <Link to={'/users'}>
                    <button onClick={this.props.onLoginClick}>Log in</button>
                </Link>
            </div>
        )
    }
}

export default Login