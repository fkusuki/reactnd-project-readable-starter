import { SET_POSTS, UPDATE_POST } from '../Actions/actionTypes';

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
    case UPDATE_POST:
  //  console.log(state);
   
        let list = state.posts;
        list.forEach((element, index) => {
          if(element.id === action.newPost.id) {
            list[index] = action.newPost;
          }
        })        
        return {
          ...state,
          posts: list,
        }
    default:
      return state;
  }
};