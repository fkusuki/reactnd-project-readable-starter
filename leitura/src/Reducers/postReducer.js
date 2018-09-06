import { SET_POSTS } from '../Actions/actionTypes';

const initialState = {
  posts: []
};

export const postReducer = (state = initialState, action) => {
  
  switch (action.type) {
    case SET_POSTS:
       return {
         ...state,
         posts: action.posts,
      }
    default:
      return state;
  }
};