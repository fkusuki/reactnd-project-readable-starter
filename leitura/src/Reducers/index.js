import { postReducer } from './postReducer';
import { orderReducer } from './orderReducer';
import { categorieReducer } from './categorieReducer';
import { combineReducers } from 'redux';
export const Reducers = combineReducers({
  setPosts: postReducer,
  updatePost: postReducer,
  setOrderList: orderReducer,
  setCategories: categorieReducer,
});