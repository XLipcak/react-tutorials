import React from "react";
import Redirect from "react-router-dom/es/Redirect";
import './Login.css';
import {RingLoader} from 'react-spinners';


class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            redirectToReferrer: false,
            username: '',
            password: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }


    login = () => {
        this.props.login(() => this.setState({redirectToReferrer: true}), this.state.username, this.state.password);
    }


    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
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
                        <input name="username"
                               type="text"
                               placeholder="Enter Username"
                               value={this.state.username}
                               onChange={this.handleInputChange} required/>

                        <label><b>Password</b></label>
                        <input name="password"
                               type="password"
                               placeholder="Enter Password"
                               value={this.state.password}
                               onChange={this.handleInputChange} required/>

                        <button className="login-button" type="submit" onClick={this.login}>Log in</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default Login