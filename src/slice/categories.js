import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
	name: "categories",
	initialState: {
		categories: [],
	},
	reducers: {
		getCategories(state, action) {
			state.categories = action.payload;
		},
		addCategory(state, action) {
			state.categories.push(action.payload);
		},
		updateCategory(state, action) {
			const category = action.payload;
			const index = state.categories.findIndex((x) => x.id === category.id);
			if (index >= 0) {
				state.categories[index] = category;
			}
		},
		deleteCategory(state, action) {
			const idNeedRemove = action.payload;
			state.categories = state.categories.filter(
				(item) => item.id !== idNeedRemove
			);
		},
	},
});

export const { getCategories, addCategory, updateCategory, deleteCategory } =
	categorySlice.actions;

export default categorySlice.reducer;
