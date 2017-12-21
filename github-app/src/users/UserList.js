import React from 'react'
import {UserItem} from "./UserItem";


export const UserList = ({users}) => {
    return (
        <div className="user-list">
            <ul>
                {users.map(user =>
                    <UserItem key={user.id} {...user}/>)}
            </ul>
        </div>
    )
}
