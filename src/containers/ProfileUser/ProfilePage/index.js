import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ProfileUser from "..";
import { useDispatch, useSelector } from "react-redux";
import { patchProfileUser } from "../../../api/auth";

// import PropTypes from 'prop-types';

ProfilePage.propTypes = {};

function ProfilePage(props) {
	const user = useSelector((state) => state.profileUser.user);
	const dispatch = useDispatch();
	const schema = yup
		.object({
			name: yup
				.string()
				.min(5, "Tên phải lớn hơn 5 ký tự")
				.max(30, "Tên phải nhỏ hơn 30 ký tự")
				.required("Tên không được để trống!"),
			phone: yup
				.number()
				.typeError("Số điện thoại phải là kiểu số!")
				.integer()
				.required(),
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
		dispatch(patchProfileUser(data));
	};
	return (
		<ProfileUser>
			<form
				action=""
				className="w-full bg-white p-6 mt-4 rounded-md"
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className="">
					<input
						{...register("email")}
						name="name"
						className="w-full text-[16px] sm:text-[14px] sm:h-[40px] my-4 h-[60px] px-4 py-2 border-[1px] border-solid border-[#ccc] focus:outline-none focus:border-sky-500 focus:shadow-md rounded-[10px] "
						type="text"
						disabled
						defaultValue={user?.email}
					/>
					<input
						{...register("name")}
						name="name"
						className="w-full text-[16px] sm:text-[14px] sm:h-[40px] my-4 h-[60px] px-4 py-2 border-[1px] border-solid border-[#ccc] focus:outline-none focus:border-sky-500 focus:shadow-md rounded-[10px] "
						type="text"
						placeholder="Nhập tên tại đây"
						defaultValue={user?.name}
					/>
					<p className="text-[red] mb-2">{errors.name?.message}</p>
					<input
						{...register("phone")}
						name="phone"
						className="block w-full text-[16px] sm:text-[14px] sm:h-[40px] my-4 h-[60px] px-4 py-2 border-[1px] border-solid border-[#ccc] focus:outline-none focus:border-sky-500 focus:shadow-md rounded-[10px] "
						type="number"
						placeholder="Nhập số điện thoại liên hệ"
						defaultValue={user?.phone}
					/>
					<p className="text-[red] mb-2">{errors.phone?.message}</p>
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

export default ProfilePage;
