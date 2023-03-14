/* eslint-disable prefer-arrow-callback */
import axios from "axios";
import moment from "moment";
// import { baseUrl } from "../config/index";

// const api = process.env.baseUrl;

function token() {
	const format = "YYYY-MM-DD HH:mm:ss";
	const date = new Date();
	const dateTimeNow = moment(date).format(format);
	const getUserInLocalStorage = JSON.parse(localStorage.getItem("user"));
	if (getUserInLocalStorage) {
		if (getUserInLocalStorage.expire_token < dateTimeNow) {
			return { "Content-Type": "application/json" };
		} else {
			return {
				"Content-Type": "application/json",
				Authorization: "Bearer " + getUserInLocalStorage.token,
			};
		}
	} else {
		return { "Content-Type": "application/json" };
	}
}
const axiosClient = axios.create({
	baseURL: "http://127.0.0.1:8000/api",
	headers: token(),
});
axiosClient.interceptors.request.use(async (config) => {
	return config;
});

axiosClient.interceptors.response.use(
	(response) => {
		if (response && response.data) {
			return response.data;
		}
		return response;
	},
	(error) => {
		// Handle errors
		throw error;
	}
);

export default axiosClient;
