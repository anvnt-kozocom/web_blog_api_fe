// store.js
import { configureStore } from "@reduxjs/toolkit";
import postSlice from "./slice/posts";
import authSlice from "./slice/auth";
import categorySlice from "./slice/categories";
import levelUserSlice from "./slice/levelUser";
import chaptersSlice from "./slice/chapters";
import homeSlice from "./slice/home";
import detailSlice from "./slice/detail";
import profileUserSlice from "./slice/profileUser";
import filterSlice from "./slice/filter";
import statisticalSlice from "./slice/statistical";
import commentSlice from "./slice/comment";

const store = configureStore({
	reducer: {
		posts: postSlice,
		user: authSlice,
		categories: categorySlice,
		levelUser: levelUserSlice,
		chapters: chaptersSlice,
		postInHome: homeSlice,
		detailOfPost: detailSlice,
		profileUser: profileUserSlice,
		filter: filterSlice,
		statistical: statisticalSlice,
		comment: commentSlice,
	},
});

export default store;
