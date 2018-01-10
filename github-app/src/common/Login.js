import React from "react";
import Redirect from "react-router-dom/es/Redirect";
import './Login.css';
import {RingLoader} from 'react-spinners';
import reduxForm from "redux-form/es/immutable/reduxForm";
import Field from "redux-form/es/Field";
import formValueSelector from "redux-form/es/formValueSelector";
import connect from "react-redux/es/connect/connect";


class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            redirectToReferrer: false
        };
    }


    login = () => {
        this.props.login(() => this.setState({redirectToReferrer: true}), this.props.username, this.props.password);
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
                <form onSubmit={(evt) => evt.preventDefault()}>
                    <div className="container">
                        {this.props.isFetching ?
                            <div className='spinner'>
                                <RingLoader
                                    color={'#123abc'}
                                    loading={this.props.isFetching}
                                />
                            </div>
                            :
                            <p>You must log in to view the page at {from.pathname}</p>
                        }

                        <label><b>Username: </b></label>
                        <Field component="input"
                               name="username"
                               type="text"
                               placeholder="Enter Username"/>

                        <label><b>Password</b></label>
                        <Field component="input"
                               name="password"
                               type="password"
                               placeholder="Enter Password"/>

                        <button className="login-button" type="submit" onClick={this.login}>Log in</button>
                    </div>
                </form>
            </div>)
    }
}


// redux-form stuff
const LoginForm = reduxForm({
    form: 'loginForm' // a unique name for this form
})(Login);

const selector = formValueSelector('loginForm') // <-- same as form name

const SelectingLoginForm = connect(
    state => {
        return {
            username: selector(state, 'username'),
            password: selector(state, 'password')
        }
    }
)(LoginForm)

export default SelectingLoginForm;