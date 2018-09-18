import { SET_POSTS, UPDATE_POST } from './actionTypes';

export const setPosts = arrPosts => ({
	type: SET_POSTS,
	posts: arrPosts
});

export const updatePost = newPost => ({
	type: UPDATE_POST,
	newPost: newPost
})