import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ProfileUser from "..";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { patchPasswordUser } from "../../../api/auth";
// import PropTypes from "prop-types";

function ChangePassPage(props) {
	const [isShowOldPassWord, setIsShowOldPassWord] = useState(true);
	const [isShowPassWord, setIsShowPassWord] = useState(true);
	const [isShowNewPassWord, setIsShowNewPassWord] = useState(true);
	const disPatch = useDispatch();
	const schema = yup
		.object({
			oldPassword: yup.string().required("Mật khẩu cũ không được để trống!"),
			password: yup
				.string()
				.required("Mật khẩu không được để trống!")
				.min(5, "Mật khẩu phải lớn hơn 5 ký tự")
				.max(30, "Mật khẩu phải nhỏ hơn 30 ký tự"),
			confirm_password: yup
				.string()
				.required("Mật khẩu không được để trống!")
				.oneOf([yup.ref("password")], "Mật khẩu không khớp!"),
		})
		.required();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	const onSubmit = (data) => {
		disPatch(patchPasswordUser(data));
	};

	return (
		<ProfileUser>
			<form
				className="w-full bg-white p-6 mt-4 rounded-md"
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className="">
					<label
						className="text-text-color-gray text-[14px]"
						htmlFor="oldPassword"
					>
						Mật khẩu cũ
					</label>
					<div className="relative">
						<input
							{...register("oldPassword")}
							id="oldPassword"
							name="oldPassword"
							className=" w-full text-[16px] sm:text-[14px] sm:h-[40px] my-4 h-[60px] px-4 py-2 border-[1px] border-solid border-[#ccc] focus:outline-none focus:border-sky-500 focus:shadow-md rounded-[10px] "
							type={isShowOldPassWord ? "password" : "text"}
							placeholder="Nhập mật khẩu cũ"
						/>
						<AiOutlineEye
							onClick={() => setIsShowOldPassWord(!isShowOldPassWord)}
							className={`text-[20px] cursor-pointer absolute right-2 top-[40%] ${
								isShowOldPassWord ? "block" : "hidden"
							}`}
						/>
						<AiOutlineEyeInvisible
							onClick={() => setIsShowOldPassWord(!isShowOldPassWord)}
							className={`text-[20px] cursor-pointer absolute right-2 top-[40%] ${
								isShowOldPassWord ? "hidden" : "block"
							}`}
						/>
					</div>
					<p className="text-[red] mb-2">{errors.oldPassword?.message}</p>
					<label
						className="text-text-color-gray text-[14px]"
						htmlFor="password"
					>
						Mật khẩu mới
					</label>
					<div className="relative">
						<input
							{...register("password")}
							id="password"
							name="password"
							className="block w-full text-[16px] sm:text-[14px] sm:h-[40px] my-4 h-[60px] px-4 py-2 border-[1px] border-solid border-[#ccc] focus:outline-none focus:border-sky-500 focus:shadow-md rounded-[10px] "
							type={isShowPassWord ? "password" : "text"}
							placeholder="Nhập mật khẩu mới"
						/>
						<AiOutlineEye
							onClick={() => setIsShowPassWord(!isShowPassWord)}
							className={`text-[20px] cursor-pointer absolute right-2 top-[40%] ${
								isShowPassWord ? "block" : "hidden"
							}`}
						/>
						<AiOutlineEyeInvisible
							onClick={() => setIsShowPassWord(!isShowPassWord)}
							className={`text-[20px] cursor-pointer absolute right-2 top-[40%] ${
								isShowPassWord ? "hidden" : "block"
							}`}
						/>
					</div>

					<p className="text-[red] mb-2">{errors.password?.message}</p>

					<label
						className="text-text-color-gray text-[14px]"
						htmlFor="confirm_password"
					>
						Nhập lại mật khẩu mới
					</label>
					<div className="relative">
						<input
							{...register("confirm_password")}
							id="confirm_password"
							name="confirm_password"
							className="block w-full text-[16px] sm:text-[14px] sm:h-[40px] my-4 h-[60px] px-4 py-2 border-[1px] border-solid border-[#ccc] focus:outline-none focus:border-sky-500 focus:shadow-md rounded-[10px] "
							type={isShowNewPassWord ? "password" : "text"}
							placeholder="Nhập mật khẩu mới"
						/>
						<AiOutlineEye
							onClick={() => setIsShowNewPassWord(!isShowNewPassWord)}
							className={`text-[20px] cursor-pointer absolute right-2 top-[40%] ${
								isShowNewPassWord ? "block" : "hidden"
							}`}
						/>
						<AiOutlineEyeInvisible
							onClick={() => setIsShowNewPassWord(!isShowNewPassWord)}
							className={`text-[20px] cursor-pointer absolute right-2 top-[40%] ${
								isShowNewPassWord ? "hidden" : "block"
							}`}
						/>
					</div>

					<p className="text-[red] mb-2">{errors.confirm_password?.message}</p>
				</div>

				<button
					className="w-[150px] p-1 bg-text-color-title hover:bg-[#036703] text-text-color-white rounded-[10px] my-4"
					type="submit"
				>
					Cập nhật
				</button>
			</form>
		</ProfileUser>
	);
}
ChangePassPage.propTypes = {};
export default ChangePassPage;
