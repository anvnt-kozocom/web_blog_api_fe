import axios from "axios";
import {
	getSlider,
	getTop,
	getNew,
	getRandom,
	getShort,
	getList,
	setIsLoadding,
} from "../slice/home";
import axiosClients from "./axiosClient";

export function fetchData() {
	return async (dispatch) => {
		try {
			const [sliderRes, topRes, newRes, randomRes, listRes, shortRes] =
				await axios.all([
					axiosClients.get("/home/slider"),
					axiosClients.get("/home/top"),
					axiosClients.get("/home/new"),
					axiosClients.get("/home/random"),
					axiosClients.get("/home/list"),
					axiosClients.get("/home/short-blog"),
				]);
			dispatch(getSlider(sliderRes.data));
			dispatch(getTop(topRes.data));
			dispatch(getNew(newRes.data));
			dispatch(getRandom(randomRes.data));
			dispatch(getList(listRes.data));
			dispatch(getShort(shortRes.data));
			dispatch(setIsLoadding(false));
		} catch (err) {}
	};
}
