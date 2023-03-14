import { createSlice } from "@reduxjs/toolkit";

const profileUserSlice = createSlice({
	name: "profileUserSlice",
	initialState: {
		user: {},
	},
	reducers: {
		setUser(state, action) {
			state.user = action.payload;
		},
	},
});

export const { setUser } = profileUserSlice.actions;

export default profileUserSlice.reducer;
