import React from "react";
// import PropTypes from 'prop-types';
import { useForm } from "react-hook-form";
import { loginAdmin } from "../../../api/auth";
import { useNavigate } from "react-router-dom";

function LoginAdmin(props) {
	const { handleSubmit, register } = useForm();
	const navigate = useNavigate();
	const onSubmit = (data) => {
		loginAdmin(data, navigate);
	};
	return (
		<div className="flex flex-col items-center justify-center h-screen bg-gray-100">
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="w-full max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
			>
				<div className="mb-4">
					<label className="block text-gray-700 font-bold mb-2" htmlFor="email">
						Email
					</label>
					<div className="relative">
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="email"
							name="email"
							{...register("email")}
							type="text"
							placeholder="Nhập email"
						/>
					</div>
				</div>
				<div className="mb-6">
					<label
						className="block text-gray-700 font-bold mb-2"
						htmlFor="password"
					>
						Mật khẩu
					</label>
					<div className="relative">
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="password"
							type="password"
							name="password"
							{...register("password")}
							placeholder="Nhập mật khẩu"
						/>
					</div>
				</div>
				<div className="flex items-center justify-between">
					<button
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
						type="submit"
					>
						Đăng nhập
					</button>
				</div>
			</form>
		</div>
	);
}
LoginAdmin.propTypes = {};

export default LoginAdmin;
