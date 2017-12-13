import React from 'react'
import PropTypes from 'prop-types';

export const TodoForm = (props)=> (
    <form>
        <input value={props.currentTodo}
               type="text"
               onChange={props.handleInputChange}/>
    </form>
)


TodoForm.propTypes = {
    currentTodo: PropTypes.string.isRequired,
    handleInputChange: PropTypes.func.isRequired
}