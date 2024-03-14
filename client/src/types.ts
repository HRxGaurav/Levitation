export interface RootState {
  auth: AuthState;
}

export interface AuthState {
  isLoggedIn: boolean;
}

export interface AuthAction {
  type: string;
  payload: boolean;
}
