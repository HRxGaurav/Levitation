
export const SET_LOGGED_IN = 'SET_LOGGED_IN';

export const setLoggedIn = (isLoggedIn: boolean) => ({
  type: SET_LOGGED_IN,
  payload: isLoggedIn,
});
