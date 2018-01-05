export const getTodos = () => {
    return fetch('http://localhost:8081/todos')
        .then(res => res.json())
}

export const updateTodo = (todo) => {
    return fetch(`http://localhost:8081/todos/${todo.id}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(todo)
    })
        .then(res => res.json())
}

export const destroyTodo = (id) => {
    return fetch(`http://localhost:8081/todos/${id}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
}