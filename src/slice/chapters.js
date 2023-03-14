import { createSlice } from "@reduxjs/toolkit";

const chapterSlice = createSlice({
	name: "chaptetrs",
	initialState: {
		chapters: [],
		currentChapter: null,
	},
	reducers: {
		getChapter(state, action) {
			state.chapters = action.payload;
		},
		setCurrentChapter(state, action) {
			state.currentChapter = action.payload;
		},
		deleteChapterOfPost(state, action) {
			const idNeedRemove = action.payload;
			state.chapters.chapters = state.chapters.chapters.filter(
				(item) => item.id !== idNeedRemove
			);
		},
	},
});

export const { getChapter, setCurrentChapter, deleteChapterOfPost } =
	chapterSlice.actions;

export default chapterSlice.reducer;
