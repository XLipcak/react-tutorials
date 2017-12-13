import React from 'react'
import {TodoForm} from "./TodoForm";
import PropTypes from 'prop-types';

export const TodoItem = (props)=> {
    return (
        <li>
            <input defaultChecked={props.isComplete}
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