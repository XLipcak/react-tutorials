import React from 'react'

export const UserItem = ({login, avatar_url}) => {
    return (
        <li>
            <div>
                <img src={avatar_url} alt={login} width="42" height="42"/>
                <p>{login}</p>
            </div>
        </li>
    )
}