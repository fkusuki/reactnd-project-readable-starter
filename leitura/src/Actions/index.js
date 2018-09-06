import { SET_POSTS } from './actionTypes';

export const setPosts = arrPosts => ({
	type: SET_POSTS,
	posts: arrPosts
});