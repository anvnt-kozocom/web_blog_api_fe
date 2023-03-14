import { createSlice } from "@reduxjs/toolkit";

const user = JSON.parse(localStorage.getItem("user"));

const authSlice = createSlice({
	name: "auth",
	initialState: user ? user : null,
	reducers: {
		getCurrentUser(state, action) {
			state = action.payload;
		},
		getUser(state, action) {
			state = action.payload;
		},
	},
});

export const { getCurrentUser, getUser } = authSlice.actions;

export default authSlice.reducer;
