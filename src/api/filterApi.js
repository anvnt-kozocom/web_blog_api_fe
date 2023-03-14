import axiosClients from "./axiosClient";
import queryString from "query-string";
import { getPosts, setLoadding, setPageCount } from "../slice/filter";

export function fetchPostWithFilter(data) {
	return async (dispatch) => {
		axiosClients
			.get(`/filter/post?${queryString.stringify(data)}`)
			.then((response) => {
				if (response.data) {
					dispatch(getPosts(response.data.data));
					dispatch(setPageCount(response.data.last_page));
					dispatch(setLoadding(false));
				} else {
				}
			})
			.catch((er) => {});
	};
}
