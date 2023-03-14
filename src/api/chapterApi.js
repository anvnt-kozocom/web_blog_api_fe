import { toast } from "react-toastify";
import { deleteChapterOfPost, getChapter } from "../slice/chapters";
import axiosClients from "./axiosClient";

export function fetchChapterOfUser(id, navigate) {
	return async (dispatch) => {
		axiosClients
			.get(`/posts/list/chapter/${id}`)
			.then((response) => {
				dispatch(getChapter(response.data));
			})
			.catch((er) => {
				toast.error(er.response.data.message, {
					position: toast.POSITION.TOP_RIGHT,
					autoClose: 1000,
				});
				setTimeout(() => {
					navigate(-1);
				}, 2000);
			});
	};
}
export function checkPostIsBelongToUser(id, navigate) {
	return async (dispatch) => {
		axiosClients
			.post(`/posts/check/post/${id}`)
			.then((response) => {})
			.catch((er) => {
				toast.error(er.response.data.message, {
					position: toast.POSITION.TOP_RIGHT,
					autoClose: 1000,
				});
				setTimeout(() => {
					navigate("/profile/list");
				}, 2000);
			});
	};
}
export function checkChapterIsBelongToUser(id, navigate) {
	return async (dispatch) => {
		axiosClients
			.post(`/posts/check/chapter/${id}`)
			.then((response) => {})
			.catch((er) => {
				toast.error(er.response.data.message, {
					position: toast.POSITION.TOP_RIGHT,
					autoClose: 1000,
				});
				setTimeout(() => {
					navigate("/profile/list");
				}, 2000);
			});
	};
}

export function addChapter(data, idPost, navigate) {
	return async (dispatch) => {
		axiosClients
			.post(`/posts/add/chapter/${idPost}`, data)
			.then((response) => {
				toast.success(response.message, {
					position: toast.POSITION.TOP_RIGHT,
					autoClose: 2000,
				});
				setTimeout(() => {
					navigate(-1);
				}, 2000);
			})
			.catch((er) => {
				toast.error(er.response.data.message, {
					position: toast.POSITION.TOP_RIGHT,
					autoClose: 2000,
				});
			});
	};
}

export function updateChapter(data, idChapter, navigate) {
	return async (dispatch) => {
		axiosClients
			.patch(`/posts/update/chapter/${idChapter}`, data)
			.then((response) => {
				toast.success(response.message, {
					position: toast.POSITION.TOP_RIGHT,
					autoClose: 2000,
				});
				setTimeout(() => {
					navigate(-1);
				}, 2000);
			})
			.catch((er) => {
				toast.error(er.response.data.message, {
					position: toast.POSITION.TOP_RIGHT,
					autoClose: 2000,
				});
			});
	};
}
export function deleteChapter(idChapter) {
	return async (dispatch) => {
		axiosClients
			.delete(`/posts/delete/chapter/${idChapter}`)
			.then((response) => {
				dispatch(deleteChapterOfPost(idChapter));
				toast.success(response.message, {
					position: toast.POSITION.TOP_RIGHT,
					autoClose: 2000,
				});
			})
			.catch((er) => {
				toast.error(er.response.data.message, {
					position: toast.POSITION.TOP_RIGHT,
					autoClose: 2000,
				});
			});
	};
}
