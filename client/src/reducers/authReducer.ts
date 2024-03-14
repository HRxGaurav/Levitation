import { AuthState, AuthAction } from '../types';

const initialState: AuthState = {
  isLoggedIn: false
};

const authReducer = (state: AuthState = initialState, action: AuthAction): AuthState => {
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