import { createSlice } from "@reduxjs/toolkit";

const homeSlice = createSlice({
	name: "posts",
	initialState: {
		posts: {
			slider: [],
			top: [],
			new: [],
			random: [],
			list: [],
			short: [],
		},
		isLoadding: true,
	},
	reducers: {
		getSlider(state, action) {
			state.posts.slider = action.payload;
		},
		getTop(state, action) {
			state.posts.top = action.payload;
		},
		getNew(state, action) {
			state.posts.new = action.payload;
		},
		getRandom(state, action) {
			state.posts.random = action.payload;
		},
		getList(state, action) {
			state.posts.list = action.payload;
		},
		getShort(state, action) {
			state.posts.short = action.payload;
		},
		setIsLoadding(state, action) {
			state.isLoadding = action.payload;
		},
	},
});

export const {
	getSlider,
	getTop,
	getNew,
	getRandom,
	getShort,
	getList,
	setIsLoadding,
} = homeSlice.actions;

export default homeSlice.reducer;
