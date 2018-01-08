import React from "react";
import Redirect from "react-router-dom/es/Redirect";
import Link from "react-router-dom/es/Link";

class Login extends React.Component {
    state = {
        redirectToReferrer: false
    }


    login = () => {
        this.props.onLoginClick();
        this.setState({redirectToReferrer: true})
        // setTimeout(() => this.setState({redirectToReferrer: true}), 3000);
    }

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
                <div>
                    <p>You must log in to view the page at {from.pathname}</p>
                    <button onClick={this.login}>Log in</button>
                </div>
            </div>
        )
    }
}

export default Login