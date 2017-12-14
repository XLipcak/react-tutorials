import React from 'react'
import {TodoItem} from "./TodoItem";
import PropTypes from 'prop-types';

export const TodoList = (props) => {
    return (
        <div className="Todo_List">
            <ul>
                {props.todos.map(todo =>
                    <TodoItem handleToggle={props.handleToggle}
                              key={todo.id}
                              handleRemove={props.handleRemove}
                              {...todo}/>
                )}
            </ul>
        </div>
    )
}

TodoList.propTypes = {
    todos: PropTypes.array.isRequired
}