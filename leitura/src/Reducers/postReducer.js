import { SET_POSTS, UPDATE_POST } from '../Actions/actionTypes';

const initialState = {
  posts: []
};

export const postReducer = (state = initialState, action) => {
  const { posts } = state
  

  switch (action.type) {
    case SET_POSTS:
       return {
         ...state,
         posts: action.posts,
      }
    case UPDATE_POST:
  //  console.log(state);
        posts.forEach((element, index) => {
          if(element.id === action.newPost.id) {
            posts[index] = action.newPost;
          }
        })
        return Object.assign({}, state, {
          posts
        })
                
        
    default:
      return state;
  }
};