import axiosClients from "./axiosClient";
import { toast } from "react-toastify";
import moment from "moment";
import { getLevelClient, getLevelUser } from "../slice/levelUser";
import { getCurrentUser } from "../slice/auth";
import { setUser } from "../slice/profileUser";

export function login(data, navigate) {
	return async (dispatch) => {
		axiosClients
			.post("/login", data)
			.then((response) => {
				if (response.user.status === "active") {
					localStorage.setItem("user", JSON.stringify(response.user));
					dispatch(getCurrentUser(response.user));
					window.location.replace("/");
				}
			})
			.catch((er) => {
				toast.error(er.response.data.login_error, {
					position: toast.POSITION.TOP_RIGHT,
					autoClose: 2000,
				});
			});
	};
}

export function logout() {
	localStorage.removeItem("user");
}

export async function loginAdmin(data, navigate) {
	return await axiosClients
		.post("/backend/admin/login", data)
		.then((response) => {
			if (response.user.status === "active") {
				localStorage.setItem("user", JSON.stringify(response.user));
				window.location.replace("/admin");
			}
		})
		.catch((er) => {
			toast.error(er.response.data.login_error, {
				position: toast.POSITION.TOP_RIGHT,
				autoClose: 2000,
			});
		});
}

export const isLogged = () => {
	const user = JSON.parse(localStorage.getItem("user"));
	const format = "YYYY-MM-DD HH:mm:ss";
	const date = new Date();
	const dateTimeNow = moment(date).format(format);
	if (user) {
		if (user.expire_token >= dateTimeNow) {
			return true;
		} else {
			localStorage.removeItem("user");
			return false;
		}
	} else {
		return false;
	}
};

export function checkLevelUser(navigate) {
	return async (dispatch) => {
		await axiosClients
			.post("/check/level/user")
			.then((response) => {
				dispatch(getLevelClient(response.level));
				dispatch(getLevelUser(response.level));
			})
			.catch((er) => {
				if (er.response.status === 401) {
					navigate("/login");
				} else {
					dispatch(getLevelUser(null));
					dispatch(getLevelClient(null));
				}
			});
	};
}

export async function signUp(data) {
	toast.loading("Đợi xíu đang kiểm tra thông tin!", {
		position: toast.POSITION.TOP_RIGHT,
		autoClose: false,
	});
	return await axiosClients
		.post("/register", data)
		.then((response) => {
			toast.dismiss();
			// setTimeout(function () {
			// }, 1000);
			toast.success(response.register_success, {
				position: toast.POSITION.TOP_RIGHT,
				autoClose: false,
			});
		})
		// setTimeout(, 20000);
		.catch((er) => {
			setTimeout(function () {
				toast.dismiss();
			}, 1000);
			if (er.response.data.errors) {
				toast.error(er.response.data.message.split("(")[0], {
					delay: 2000,
					position: toast.POSITION.TOP_RIGHT,
					autoClose: false,
				});
			}
		});
}
export async function active(data, navigate) {
	toast.loading("Đợi xíu đang kiểm tra thông tin!", {
		position: toast.POSITION.TOP_RIGHT,
		autoClose: false,
	});
	return await axiosClients
		.get(`/active-account/${data.id}/${data.token}`)
		.then((response) => {
			toast.dismiss();
			toast.success(response.active_success, {
				position: toast.POSITION.TOP_RIGHT,
				autoClose: false,
			});
			setTimeout(function () {
				navigate("/login");
			}, 2000);
		})
		.catch((er) => {
			setTimeout(function () {
				toast.dismiss();
			}, 1000);
			if (er.response.data.active_error) {
				toast.error(er.response.data.active_error, {
					delay: 2000,
					position: toast.POSITION.TOP_RIGHT,
					autoClose: false,
				});
			}
		});
}

export async function forgotPassword(data) {
	toast.loading("Đợi xíu đang kiểm tra thông tin!", {
		position: toast.POSITION.TOP_RIGHT,
		autoClose: false,
	});
	return await axiosClients
		.post("/forgot-password", data)
		.then((response) => {
			toast.dismiss();
			toast.success(response.forgot_success, {
				position: toast.POSITION.TOP_RIGHT,
				autoClose: false,
			});
		})
		.catch((er) => {
			setTimeout(function () {
				toast.dismiss();
			}, 1000);
			if (er.response.data.forgot_error) {
				toast.error(er.response.data.forgot_error, {
					delay: 2000,
					position: toast.POSITION.TOP_RIGHT,
					autoClose: false,
				});
			}
		});
}

export async function changePassword(data, id, token) {
	toast.loading("Đợi xíu đang kiểm tra thông tin!", {
		position: toast.POSITION.TOP_RIGHT,
		autoClose: false,
	});
	return await axiosClients
		.post("/change-password/" + id + "/" + token, data)
		.then((response) => {
			toast.dismiss();
			toast.success(response.change_success, {
				position: toast.POSITION.TOP_RIGHT,
				autoClose: false,
			});
		})
		.catch((er) => {
			setTimeout(function () {
				toast.dismiss();
			}, 1000);
			if (er.response.data.change_error) {
				toast.error(er.response.data.change_error, {
					delay: 2000,
					position: toast.POSITION.TOP_RIGHT,
					autoClose: false,
				});
			}
		});
}

export function fetchProfileUser() {
	return async (dispatch) => {
		axiosClients
			.get("/profile/user")
			.then((response) => {
				dispatch(setUser(response.data));
			})
			.catch((er) => {
				if (er.response.data.errors) {
					toast.error(er.response.data.message.split("(")[0], {
						delay: 2000,
						position: toast.POSITION.TOP_RIGHT,
						autoClose: false,
					});
				}
			});
	};
}
export function patchProfileUser(data) {
	return async (dispatch) => {
		axiosClients
			.patch("/profile/update/user", data)
			.then((response) => {
				toast.success(response.message, {
					position: toast.POSITION.TOP_RIGHT,
					autoClose: 3000,
				});
				dispatch(setUser(response.data));
			})
			.catch((er) => {
				if (er.response.data.errors) {
					toast.error(er.response.data.message.split("(")[0], {
						delay: 2000,
						position: toast.POSITION.TOP_RIGHT,
						autoClose: false,
					});
				}
			});
	};
}
export function patchPasswordUser(data) {
	return async (dispatch) => {
		axiosClients
			.patch("/profile/update/password", data)
			.then((response) => {
				toast.success(response.message, {
					position: toast.POSITION.TOP_RIGHT,
					autoClose: 3000,
				});
			})
			.catch((er) => {
				if (er.response.data.errors) {
					toast.error(er.response.data.message.split("(")[0], {
						delay: 2000,
						position: toast.POSITION.TOP_RIGHT,
						autoClose: false,
					});
				}
			});
	};
}
