import React from 'react'
import {TodoForm} from "./TodoForm";
import PropTypes from 'prop-types';
import {partial} from '../../lib/utils'

export const TodoItem = (props) => {
    const handleToggle = partial(props.handleToggle, props.id)
    const handleRemove = partial(props.handleRemove, props.id)
    return (
        <li>
            <span className="delete-item">
                <a href="#" onClick={handleRemove}>X</a>
            </span>

            <input checked={props.isComplete}
                   onChange={handleToggle}
                   type="checkbox"/>
            {props.name}
        </li>
    )
}

TodoItem.propTypes = {
    name: PropTypes.string.isRequired,
    isComplete: PropTypes.bool,
    id: PropTypes.number.isRequired
}