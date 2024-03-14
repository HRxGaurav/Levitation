const initialState = {
    isLoggedIn: false
};
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_LOGGED_IN':
            return {
                ...state,
                isLoggedIn: action.payload
            };
        default:
            return state;
    }
};
export default authReducer;
