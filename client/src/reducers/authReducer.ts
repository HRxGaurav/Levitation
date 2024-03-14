import { AuthState } from "../types";

const initialState: AuthState = {
  isLoggedIn: false
};

const authReducer = (state: AuthState = initialState, action: any) => {
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
