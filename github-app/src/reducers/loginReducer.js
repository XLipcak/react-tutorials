const loginReducer = (state = {isAuthenticated: false}, action) => {
    // console.log(action)
    switch (action.type) {
        case 'LOGIN':
            return {
                isAuthenticated: true
            };
        case 'LOGOUT':
            return {
                isAuthenticated: false
            };
        default:
            return state;
    }
}

export default loginReducer