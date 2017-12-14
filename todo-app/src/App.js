import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {TodoForm, TodoList, Footer} from './components/todo'
import {addTodo, generateId, findById, toggleTodo, updateTodo, removeTodo} from './lib/TodoHelpers'
import {pipe, partial} from './lib/utils'

class App extends Component {

    state = {
        todos: [
            {id: 1, name: 'Learn JSX', isComplete: true},
            {id: 2, name: 'Build an App', isComplete: false},
            {id: 3, name: 'Ship It', isComplete: false}
        ],
        currentTodo: ''
    }

    handleToggle = (id) => {
        const getUpdatedTodos = pipe(findById, toggleTodo, partial(updateTodo, this.state.todos))
        const updatedTodos = getUpdatedTodos(id, this.state.todos)
        this.setState({
            todos: updatedTodos
        })
    }

    handleRemove = (id, evt) => {
        evt.preventDefault()
        const updatedTodos = removeTodo(this.state.todos, id)
        this.setState({
            todos: updatedTodos
        })
    }

    handleSubmit = (evt) => {
        evt.preventDefault()
        const newId = generateId();
        const newTodo = {id: newId, name: this.state.currentTodo, isComplete: false}
        this.setState({
            todos: addTodo(this.state.todos, newTodo),
            currentTodo: '',
            errorMessage: ''
        })
    }

    handleEmptySubmit = (evt) => {
        evt.preventDefault()
        this.setState({
            errorMessage: 'Please supply a todo name'
        })
    }

    handleInputChange = (evt) => {
        this.setState({
            currentTodo: evt.target.value
        })
    }

    render() {
        const submitHandler = this.state.currentTodo ? this.handleSubmit : this.handleEmptySubmit
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h2>React Todos</h2>
                </header>
                <div className="Todo-App">
                    {this.state.errorMessage && <span className="error">{this.state.errorMessage}</span>}
                    <TodoForm
                        handleInputChange={this.handleInputChange}
                        currentTodo={this.state.currentTodo}
                        handleSubmit={submitHandler}/>
                    <TodoList todos={this.state.todos}
                              handleToggle={this.handleToggle}
                              handleRemove={this.handleRemove}/>
                    <Footer/>
                </div>
            </div>
        );
    }
}

export default App;
