export interface RootState {
  auth: AuthState;
}

export interface AuthState {
  isLoggedIn: boolean;
}
