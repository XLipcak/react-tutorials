export const fetchingReducer = (state = false, action) => {
    switch (action.type) {
        case 'FETCHING':
            return true;
        case 'FETCHING_SUCCESS':
            return false;
        case 'FETCHING_FAIL':
            return false;
        default:
            return state;
    }
};