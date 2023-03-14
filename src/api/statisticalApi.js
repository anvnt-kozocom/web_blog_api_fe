import { setChapters, setPosts, setPostsView } from "../slice/statistical";
// import {
// 	getChapterContent,
// } from "../slice/detail";

import axiosClients from "./axiosClient";

export function fetchDataStatistical() {
	return async (dispatch) => {
		axiosClients
			.get("/statis")
			.then((response) => {
				dispatch(setPosts(response.data.posts));
				dispatch(setChapters(response.data.chapters));
			})
			.catch((er) => {});
	};
}

export function fetchDataStatisticalView() {
	return async (dispatch) => {
		axiosClients
			.get("/statis/view")
			.then((response) => {
				dispatch(setPostsView(response.data));
			})
			.catch((er) => {});
	};
}
