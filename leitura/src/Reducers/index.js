import { postReducer } from './postReducer';
import { combineReducers } from 'redux';
export const Reducers = combineReducers({
  getPosts: postReducer,
  setPosts: postReducer,
});