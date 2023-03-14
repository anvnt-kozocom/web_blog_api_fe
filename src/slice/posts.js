import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
	name: "posts",
	initialState: {
		posts: [],
		postsOfUser: [],
		currentPost: null,
		isLoadding: true,
	},
	reducers: {
		getPosts(state, action) {
			state.posts = action.payload;
		},
		setCurrentPost(state, action) {
			state.currentPost = action.payload;
		},
		getPostsOfUser(state, action) {
			state.postsOfUser = action.payload;
		},
		deletePostOfUser(state, action) {
			const idNeedRemove = action.payload;
			state.postsOfUser = state.postsOfUser.filter(
				(item) => item.id !== idNeedRemove
			);
		},
		setIsLoadding(state, action) {
			state.isLoadding = action.payload;
		},
	},
});

export const {
	getPosts,
	setCurrentPost,
	getPostsOfUser,
	deletePostOfUser,
	setIsLoadding,
} = postSlice.actions;

export default postSlice.reducer;
