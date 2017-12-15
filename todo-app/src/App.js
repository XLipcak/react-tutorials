import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {TodoForm, TodoList, Footer} from './components/todo'
import {addTodo, generateId, findById, toggleTodo, updateTodo, removeTodo, filterTodos} from './lib/TodoHelpers'
import {pipe, partial} from './lib/utils'
import PropTypes from 'prop-types';
import {loadTodos, saveTodo, deleteTodo} from './lib/todoService';

class App extends Component {

    state = {
        todos: [],
        currentTodo: ''
    }

    static contextTypes = {
        route: PropTypes.string
    }

    showTempMessage = (msg) => {
        this.setState({message: msg})
        setTimeout(() => this.setState({message: ''}), 2500)
    }

    componentDidMount() {
        loadTodos()
            .then(todos => this.setState({todos}))
    }

    handleToggle = (id) => {
        const getToggledTodo = pipe(findById, toggleTodo)
        const updated = getToggledTodo(id, this.state.todos)
        const getUpdatedTodos = partial(updateTodo, this.state.todos)
        const updatedTodos = getUpdatedTodos(updated)
        this.setState({
            todos: updatedTodos
        })
        saveTodo(updated)
            .then(() => this.showTempMessage('Todo updated'))
    }

    handleRemove = (id, evt) => {
        evt.preventDefault()
        const updatedTodos = removeTodo(this.state.todos, id)
        this.setState({
            todos: updatedTodos
        })
        deleteTodo(id)
            .then(() => this.showTempMessage('Todo removed'))
            .catch(() => this.showTempMessage('Todo removed failed'))
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
        saveTodo(newTodo)
            .then(() => this.showTempMessage('Todo added'))
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
        const displayTodos = filterTodos(this.state.todos, this.context.route)
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h2>React Todos</h2>
                </header>
                <div className="Todo-App">
                    {this.state.errorMessage && <span className="error">{this.state.errorMessage}</span>}
                    {this.state.message && <span className="success">{this.state.message}</span>}
                    <TodoForm
                        handleInputChange={this.handleInputChange}
                        currentTodo={this.state.currentTodo}
                        handleSubmit={submitHandler}/>
                    <TodoList todos={displayTodos}
                              handleToggle={this.handleToggle}
                              handleRemove={this.handleRemove}/>
                    <Footer/>
                </div>
            </div>
        );
    }
}

export default App;
