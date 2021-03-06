export const login = (successCallback, username, password) => {
    return (dispatch) => {
        dispatch(fetchingAction());

        new Promise((resolve, reject) => {
            console.log('logging in: ' + username + ' ' + password);
            setTimeout(() => {
                if (username === password) {
                    dispatch(loginAction());
                    resolve();
                } else {
                    dispatch(logoutAction());
                    reject();
                }
            }, 3000);
        }).then(() => {
            console.log('login success');
            dispatch(fetchingSuccessAction());
            successCallback();
        }).catch(() => {
            console.log('login fail');
            dispatch(fetchingFailedAction());
        })
    }
};

export const logout = () => {
    return logoutAction();
};

const fetchingAction = () => {
    return {
        type: 'FETCHING'
    }
};

const fetchingSuccessAction = () => {
    return {
        type: 'FETCHING_SUCCESS'
    }
};

const fetchingFailedAction = () => {
    return {
        type: 'FETCHING_FAIL'
    }
};

const loginAction = () => {
    return {
        type: 'LOGIN'
    }
};

const logoutAction = () => {
    return {
        type: 'LOGOUT'
    }
};