import moment from "moment";

const dateTime = "YYYY-MM-DD HH:mm:ss";
const timeDate = "HH:mm:ss YYYY-MM-DD ";
export const formatDateTime = (date) => {
	return moment(date).format(dateTime);
};
export const formatTimeDate = (date) => {
	return moment(date).format(timeDate);
};
