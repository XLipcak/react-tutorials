const loginReducer = (state = {logged: false}, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                logged: true
            };
        case 'LOGOUT':
            return {
                logged: false
            };
        default:
            return state;
    }
}

export default loginReducer