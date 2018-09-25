import { SET_CATEGORIES } from '../Actions/actionTypes';

const initialState = {
  categories: []
};

export const categorieReducer = (state = initialState, action) => {
  
  switch (action.type) {
    case SET_CATEGORIES:
       return {
         ...state,
         categories: action.categories,
      }
    default:
      return state;
  }
};