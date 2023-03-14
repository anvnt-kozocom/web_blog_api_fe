import axios from "axios";
import {
	getChapterContent,
	getDetail,
	getListChapter,
	getListComment,
	getListPostSame,
	getNewChapter,
	setLoadding,
	setLoaddingChapter,
} from "../slice/detail";
import axiosClients from "./axiosClient";

export function fetchData(slug, navigate) {
	return async (dispatch) => {
		try {
			const [detailRes, newChapterRes, listPostSameRes, listCommentRes] =
				await axios.all([
					axiosClients.get(`/detail/${slug}`),
					axiosClients.get(`/chapter/new/${slug}`),
					axiosClients.get(`/post/same/${slug}`),
					axiosClients.get(`/comment/${slug}`),
				]);
			if (detailRes.data) {
				dispatch(getDetail(detailRes.data));
				dispatch(getNewChapter(newChapterRes.data));
				dispatch(getListPostSame(listPostSameRes.data));
				dispatch(getListComment(listCommentRes.data));
				dispatch(setLoadding(false));
			} else {
				navigate("/");
			}
		} catch (err) {}
	};
}
export function fetchListChapter(slug, pageNumber) {
	return async (dispatch) => {
		axiosClients
			.get(`/chapter/${slug}?page=${pageNumber ? pageNumber : 1}`)
			.then((response) => {
				dispatch(getListChapter(response.data));
			})
			.catch((er) => {});
	};
}
export function fetchChapterContent(slug, navigate) {
	return async (dispatch) => {
		axiosClients
			.get(`/view/chapter/${slug}`)
			.then((response) => {
				if (response.data) {
					dispatch(getChapterContent(response.data));
					dispatch(setLoaddingChapter(false));
				} else {
					navigate("/");
				}
			})
			.catch((er) => {});
	};
}
export function fetchComments(slug) {
	return async (dispatch) => {
		axiosClients
			.get(`/comment/${slug}`)
			.then((response) => {
				dispatch(getListComment(response.data));
			})
			.catch((er) => {});
	};
}
export function updateView(slug) {
	return async (dispatch) => {
		axiosClients
			.patch(`/post/view/${slug}`)
			.then((response) => {})
			.catch((er) => {});
	};
}
