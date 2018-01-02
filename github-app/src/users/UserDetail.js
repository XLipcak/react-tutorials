import React from 'react'
import {loadUserDetail} from "../service/githubService";

export class UserDetail extends React.Component {

    state = {
        user: {},
        fetchState: 'loading'
    }

    componentDidMount() {
        loadUserDetail(this.props.id)
            .then(response => {
                this.setState({
                    user: response,
                    fetchState: 'success'
                })
            })
            .catch(() => {
                this.setState({
                        fetchState: 'fail'
                    }
                )
            })
    }

    render() {
        return (
            <div>
                {this.state.fetchState !== 'success' ? <h1> {this.state.fetchState} </h1> :

                    <div>
                        <img src={this.state.user.avatar_url} alt={this.state.user.login} width="100" height="100"/>

                        <table className='table-center'>
                            <tbody>
                                <tr>
                                    <td>Login</td>
                                    <td>{this.state.user.login}</td>
                                </tr>
                                <tr>
                                    <td>Name</td>
                                    <td>{this.state.user.name}</td>
                                </tr>
                                <tr>
                                    <td>Repositories</td>
                                    <td>{this.state.user.public_repos}</td>
                                </tr>
                                <tr>
                                    <td>Followers</td>
                                    <td>{this.state.user.followers}</td>
                                </tr>
                                <tr>
                                    <td>Following</td>
                                    <td>{this.state.user.following}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                }
            </div>
        )
    }

}