import { combineReducers } from 'redux';
import authReducer from './authReducer';
import moviesReducer from './moviesReducer';
import userReducer from './userReducer';

export default combineReducers({
  auth: authReducer,
  movies: moviesReducer,
  user: userReducer
});
