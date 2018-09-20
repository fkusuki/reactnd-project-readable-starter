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
      return {
          ...state,
          posts:posts.map(post => (action.newPost.id === post.id ? action.newPost : post)),
      }              
        
    default:
      return state;
  }
};