
import { createStore, combineReducers } from 'redux';
import authReducer from '../reducers/authReducer';
import { RootState } from '../types';

const rootReducer = combineReducers<RootState>({
  auth: authReducer
});

const store = createStore(rootReducer);

export default store;
