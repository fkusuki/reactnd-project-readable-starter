import { SET_POSTS, UPDATE_POST, SET_ORDER_LIST } from './actionTypes';

export const setPosts = arrPosts => ({
	type: SET_POSTS,
	posts: arrPosts
});

export const updatePost = newPost => ({
	type: UPDATE_POST,
	newPost: newPost
})

export const setOrderList = ordem => ({
	type: SET_ORDER_LIST,
	ordem
})
