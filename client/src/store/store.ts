// store.ts
import { combineReducers, createStore } from 'redux';
import authReducer from '../reducers/authReducer';
import { AuthState } from '../types';

const rootReducer = combineReducers({
  auth: authReducer
});

const store = createStore(rootReducer);

export default store;

export interface RootState {
  auth: AuthState;
}
