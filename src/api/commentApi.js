import { toast } from "react-toastify";
import {
	addComment,
	deleteCommentStore,
	updateCommentStore,
} from "../slice/detail";
import axiosClients from "./axiosClient";

export function postComment(data) {
	return async (dispatch) => {
		axiosClients
			.post("/comment", data)
			.then((response) => {
				toast.success(response.message, {
					position: toast.POSITION.TOP_RIGHT,
					autoClose: 1000,
				});
				dispatch(addComment(response.data));
			})
			.catch((er) => {});
	};
}
export function updateComment(id, data) {
	return async (dispatch) => {
		axiosClients
			.patch(`/comment/update/${id}`, data)
			.then((response) => {
				console.log(response);
				toast.success(response.message, {
					position: toast.POSITION.TOP_RIGHT,
					autoClose: 1000,
				});
				dispatch(updateCommentStore(response.data));
			})
			.catch((er) => {});
	};
}

export function deleteComment(id) {
	return async (dispatch) => {
		axiosClients
			.delete(`/comment/delete/${id}`)
			.then((response) => {
				console.log(response);
				toast.success(response.message, {
					position: toast.POSITION.TOP_RIGHT,
					autoClose: 1000,
				});
				dispatch(deleteCommentStore(response.data));
			})
			.catch((er) => {});
	};
}
