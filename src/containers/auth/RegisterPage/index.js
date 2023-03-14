import React from "react";
// import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link } from "react-router-dom";
import logo from "../../../image/icon/logo.png";
import { signUp } from "../../../api/auth";

RegisterPage.propTypes = {};

function RegisterPage(props) {
	const schema = yup.object().shape({
		email: yup
			.string()
			.required("Email không được để trống!")
			.email("Email không hợp lệ"),
		name: yup
			.string()
			.required("Tên không được để trống!")
			.min(6, "Tên phải ít nhất 6 ký tự!")
			.max(200, "Tên không được vượt quá 30 ký tự!"),
		password: yup
			.string()
			.required("Mật khẩu không được để trống!")
			.min(6, "Mật khẩu phải ít nhất 6 ký tự!"),
		confirm_password: yup
			.string()
			.required("Mật khẩu không được để trống!")
			.oneOf([yup.ref("password")], "Mật khẩu không khớp!"),
	});
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});
	const onSubmit = (data) => {
		signUp(data);
	};

	return (
		<div className="h-full gradient-form fixed top-0 left-0 right-0 bottom-0 z-[1000]">
			<div className="py-12 px-6 h-full relative">
				<div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800 ">
					<div className="block bg-white shadow-lg rounded-lg p-4 relative">
						<AiOutlineCloseCircle className="absolute right-4 text-[26px] hover:text-[red] cursor-pointer" />
						<Link to="/" className="text-center">
							<img className="mx-auto w-48" src={logo} alt="logo" />
							<h4 className="text-xl font-semibold mt-1 mb-4 pb-1">Đăng ký</h4>
						</Link>
						<form className="" onSubmit={handleSubmit(onSubmit)}>
							<p className="mb-4">Nhập thông tin đăng ký</p>
							<div className="mb-4">
								<input
									type="text"
									className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
									placeholder="Tên của bạn"
									name="name"
									{...register("name")}
								/>
								{errors.name && (
									<p className="text-[red] mt-2 text-[14px] ">
										{errors.name?.message}
									</p>
								)}
							</div>
							<div className="mb-4">
								<input
									type="text"
									className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
									placeholder="Email"
									name="email"
									{...register("email")}
								/>
								{errors.email && (
									<p className="text-[red] mt-2 text-[14px] ">
										{errors.email?.message}
									</p>
								)}
							</div>
							<div className="mb-4">
								<input
									type="password"
									className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
									placeholder="Mật khẩu"
									name="password"
									{...register("password")}
								/>
								{errors.password && (
									<p className="text-[red] mt-2 text-[14px] ">
										{errors.password?.message}
									</p>
								)}
							</div>
							<div className="mb-4">
								<input
									type="password"
									className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
									placeholder="Nhập lại mật khẩu"
									name="confirm_password"
									{...register("confirm_password")}
								/>
								{errors.confirm_password && (
									<p className="text-[red] mt-2 text-[14px] ">
										{errors.confirm_password?.message}
									</p>
								)}
							</div>
							<div className="text-center pt-1 mb-6 pb-1">
								<button
									className="inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
									type="submit"
									data-mdb-ripple="true"
									data-mdb-ripple-color="light"
									style={{
										background:
											"linear-gradient(to right, rgb(68 255 0), rgb(9 203 16), rgb(46 167 10), rgb(11 164 12))",
									}}
								>
									Đăng ký
								</button>
							</div>
							<div className="flex items-center justify-between pb-6">
								<p className="mb-0 mr-2">Bạn đã có tài khoản?</p>
								<Link
									to="/login"
									type="button"
									className="inline-block px-6 py-2 border-2 border-red-600 text-red-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
									data-mdb-ripple="true"
									data-mdb-ripple-color="light"
								>
									Đăng nhập
								</Link>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

export default RegisterPage;
