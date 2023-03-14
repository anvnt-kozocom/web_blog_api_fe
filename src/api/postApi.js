import { toast } from "react-toastify";
import {
	deletePostOfUser,
	getPosts,
	getPostsOfUser,
	setIsLoadding,
} from "../slice/posts";
import axiosClients from "./axiosClient";

export function fetchPosts() {
	return async (dispatch) => {
		axiosClients
			.get("/posts")
			.then((response) => {
				dispatch(getPosts(response.data));
			})
			.catch((er) => {});
	};
}
// get post of user
export function fetchPostsOfUser() {
	return async (dispatch) => {
		axiosClients
			.get("/posts/list/story")
			.then((response) => {
				dispatch(getPostsOfUser(response.data));
				dispatch(setIsLoadding(false));
			})
			.catch((er) => {});
	};
}
// add post
export function addPost(data, navigate) {
	return async (dispatch) => {
		const config = {
			headers: { "Content-Type": "multipart/form-data" },
		};
		axiosClients
			.post("/posts/add/story", data, config)
			.then((response) => {
				toast.success(response.message, {
					position: toast.POSITION.TOP_RIGHT,
					autoClose: 2000,
				});
				navigate("/profile/list");
			})
			.catch((er) => {
				toast.error(
					er.response.data.message
						? er.response.data.message.split("(")[0]
						: er.response.data.errors,
					{
						position: toast.POSITION.TOP_RIGHT,
						autoClose: 2000,
					}
				);
			});
	};
}

export function updatePost(data, id, navigate) {
	return async (dispatch) => {
		const config = {
			headers: { "Content-Type": "multipart/form-data" },
		};
		axiosClients
			.post(`/posts/update/story/${id}`, data, config)
			.then((response) => {
				toast.success(response.message, {
					position: toast.POSITION.TOP_RIGHT,
					autoClose: 2000,
				});
				navigate("/profile/list");
			})
			.catch((er) => {
				toast.error(
					er.response.data.message
						? er.response.data.message.split("(")[0]
						: er.response.data.errors,
					{
						position: toast.POSITION.TOP_RIGHT,
						autoClose: 2000,
					}
				);
			});
	};
}

export function deletePost(id) {
	return async (dispatch) => {
		axiosClients
			.delete(`/posts/delete/story/${id}`)
			.then((response) => {
				dispatch(deletePostOfUser(id));
				toast.success(response.message, {
					position: toast.POSITION.TOP_RIGHT,
					autoClose: 2000,
				});
			})
			.catch((er) => {
				toast.error(
					er.response.data.message
						? er.response.data.message.split("(")[0]
						: er.response.data.errors,
					{
						position: toast.POSITION.TOP_RIGHT,
						autoClose: 2000,
					}
				);
			});
	};
}
