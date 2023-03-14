import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
	name: "filterSlice",
	initialState: {
		posts: [],
		loadding: true,
		pageCount: 0,
		valueSearch: "",
	},
	reducers: {
		getPosts(state, action) {
			state.posts = action.payload;
		},
		setLoadding(state, action) {
			state.loadding = action.payload;
		},
		setPageCount(state, action) {
			state.pageCount = action.payload;
		},
		setValueSearch(state, action) {
			state.valueSearch = action.payload;
		},
	},
});

export const { getPosts, setLoadding, setPageCount, setValueSearch } =
	filterSlice.actions;

export default filterSlice.reducer;
