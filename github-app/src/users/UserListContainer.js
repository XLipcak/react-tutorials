import React from 'react'
import {UserList} from "./UserList";
import {loadUsers} from "../service/githubService";
import UserListFilter from "./UserListFilter";

export class UserListContainer extends React.Component {

    state = {
        filter: {
            name: '',
            repos: 0
        },
        users: [],
        fetchState: 'loading'
    }

    filterChanged = (filter) => {
        this.setState({
            fetchState: 'loading',
            filter,
            users: []
        })

        this.updateUserState(filter)
    }

    updateUserState(filter) {
        loadUsers(filter)
            .then(response => {
                this.setState({
                    users: response.items,
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

    componentDidMount() {
        this.updateUserState(this.state.filter);
    }

    render() {
        const {filter} = this.state;
        return (
            <div>
                <UserListFilter value={filter} onChange={this.filterChanged}/>

                {this.state.fetchState !== 'success' ? <h1> {this.state.fetchState} </h1> :
                    <UserList users={this.state.users}/>}

            </div>
        )
    }
}