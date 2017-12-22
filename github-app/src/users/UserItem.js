import React from 'react'
import Link from "react-router-dom/es/Link";

export const UserItem = ({login, avatar_url}) => {
    return (
        <li>
            <div>
                <img src={avatar_url} alt={login} width="42" height="42"/>
                <Link to={`/users/${login}`}>
                    <p>{login}</p>
                </Link>
            </div>
        </li>
    )
}