import React from 'react'
import {UserList} from "../components/UserList";
import {loadUsers} from "../service/githubService";
import InputFilter from '../components/InputFilter';

export class UserListContainer extends React.Component {

    state = {
        filter: {
            name: {
                value: '',
                label: 'Name: '
            },
            repos: {
                value: 0,
                label: 'Min repos: '
            }
        },
        users: [],
        fetchState: 'loading'
    };

    filterChanged = (newVal, keyProp) => {
        const actualFilter = Object.assign(this.state.filter);
        actualFilter[keyProp].value = newVal;
        this.setState({
            fetchState: 'loading',
            filter: actualFilter,
            users: []
        });
        this.updateUserState();
    };

    updateUserState() {
        loadUsers(this.state.filter['name'].value, this.state.filter['repos'].value)
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
        this.updateUserState();
    }

    render() {
        const {filter} = this.state;
        return (
            <div>
                <InputFilter filter={filter} keyProp={'name'} onChange={this.filterChanged}/>
                <InputFilter filter={filter} keyProp={'repos'} onChange={this.filterChanged}
                             type={'range'} min={1} max={100}/>

                {this.state.fetchState !== 'success' ? <h1> {this.state.fetchState} </h1> :
                    <UserList users={this.state.users}/>}

            </div>
        )
    }
}