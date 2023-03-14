import { toast } from "react-toastify";
import {
	addCategory,
	getCategories,
	updateCategory,
	deleteCategory,
} from "../slice/categories";
import axiosClients from "./axiosClient";

export function fetchCategories(data) {
	return async (dispatch) => {
		await axiosClients
			.get("/category")
			.then((response) => {
				dispatch(getCategories(response.data));
			})
			.catch((er) => {});
	};
}

export function insertCategories(data) {
	return async (dispatch) => {
		await axiosClients
			.post("backend/category", data)
			.then((response) => {
				toast.success(response.message, {
					position: toast.POSITION.TOP_RIGHT,
					autoClose: 2000,
				});
				dispatch(addCategory(response.data));
			})
			.catch((er) => {
				toast.error(er.response.data.message.split("(")[0], {
					position: toast.POSITION.TOP_RIGHT,
					autoClose: 2000,
				});
			});
	};
}
export function updateCategories(data, id) {
	return async (dispatch) => {
		await axiosClients
			.patch(`backend/category/update/${id}`, data)
			.then((response) => {
				toast.success(response.message, {
					position: toast.POSITION.TOP_RIGHT,
					autoClose: 2000,
				});
				dispatch(updateCategory(response.data));
			})
			.catch((er) => {
				toast.error(er.response.data.message.split("(")[0], {
					position: toast.POSITION.TOP_RIGHT,
					autoClose: 2000,
				});
			});
	};
}

export function deleteCategories(id) {
	return async (dispatch) => {
		await axiosClients
			.delete(`backend/category/delete/${id}`)
			.then((response) => {
				toast.success(response.message, {
					position: toast.POSITION.TOP_RIGHT,
					autoClose: 2000,
				});
				dispatch(deleteCategory(id));
			})
			.catch((er) => {
				toast.error(er.response.data.errors, {
					position: toast.POSITION.TOP_RIGHT,
					autoClose: 2000,
				});
			});
	};
}
