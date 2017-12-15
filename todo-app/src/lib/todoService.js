const baseUrl = 'http://localhost:8081/todos'

export const loadTodos = () => {
    return fetch(baseUrl)
        .then(res => res.json())
}