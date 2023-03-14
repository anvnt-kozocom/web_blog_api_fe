import { createSlice } from "@reduxjs/toolkit";

// const user = JSON.parse(localStorage.getItem("user"));

const levelUserSlice = createSlice({
	name: "levelUser",
	initialState: {
		level: 0,
		levelClient: 1,
		error: null,
	},
	reducers: {
		getLevelUser(state, action) {
			state.level = action.payload;
		},
		getLevelClient(state, action) {
			state.levelClient = action.payload;
		},
	},
});

export const { getLevelUser, getLevelClient } = levelUserSlice.actions;

export default levelUserSlice.reducer;
