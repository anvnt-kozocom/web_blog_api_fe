import { createSlice } from "@reduxjs/toolkit";

const commentSlice = createSlice({
	name: "commnetSlice",
	initialState: {
		currenIdComment: 0,
	},
	reducers: {
		setCurrenIdComment(state, action) {
			state.currenIdComment = action.payload;
		},
	},
});

export const { setCurrenIdComment } = commentSlice.actions;

export default commentSlice.reducer;
