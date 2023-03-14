import { createSlice } from "@reduxjs/toolkit";

const statisticalSlice = createSlice({
	name: "statisticalSlice",
	initialState: {
		posts: [],
		chapters: [],
		postsView: [],
	},
	reducers: {
		setPosts(state, action) {
			state.posts = action.payload;
		},
		setChapters(state, action) {
			state.chapters = action.payload;
		},
		setPostsView(state, action) {
			state.postsView = action.payload;
		},
	},
});

export const { setPosts, setChapters, setPostsView } = statisticalSlice.actions;

export default statisticalSlice.reducer;
