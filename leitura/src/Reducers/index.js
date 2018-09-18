import { postReducer } from './postReducer';
import { combineReducers } from 'redux';
export const Reducers = combineReducers({
  setPosts: postReducer,
  updatePost: postReducer,
});