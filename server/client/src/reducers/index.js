import { combineReducers } from 'redux';
import authReducer from './authReducer';
import moviesReducer from './moviesReducer';
import adminReducer from './adminReducer';

export default combineReducers({
  auth: authReducer,
  movies: moviesReducer,
  admin: adminReducer
});
