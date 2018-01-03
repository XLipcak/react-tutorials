import React from 'react'
import Footer from './Footer'
import AddTodo from '../containers/AddTodo'
import VisibleTodoList from '../containers/VisibleTodoList'

const App = ({filter}) => (
    <div>
        <AddTodo/>
        <VisibleTodoList
            filter={filter || 'all'}
        />
        <Footer/>
    </div>
)

export default App