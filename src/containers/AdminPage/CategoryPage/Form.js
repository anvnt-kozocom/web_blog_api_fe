import React, { useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { convertNameToSlug } from "../../../ultits";
import { useDispatch } from "react-redux";
import { insertCategories, updateCategories } from "../../../api/categoryApi";

function Form(props) {
	const { onToggleFormCategory, defaultCategory } = props;

	const [slug, setSlug] = useState("");
	const [isTrue, setIsTrue] = useState(false);

	const dispatch = useDispatch();
	const schema = yup
		.object({
			name: yup
				.string("Tên phải là ký tự chuỗi")
				.required("Tên không được để trống!")
				.max(30, "Tên không được quá 30 ký tự"),
			description: yup
				.string("Mô tả phải là ký tự chuỗi")
				.max(200, "Slug không được quá 200 ký tự"),
		})
		.required();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	const onChangeNameCategory = (e) => {
		setIsTrue(true);
		let name = e.target.value;
		setSlug(convertNameToSlug(name));
	};
	const onSubmit = (data) => {
		data.slug = convertNameToSlug(data.name);
		if (defaultCategory.id) {
			// update
			dispatch(updateCategories(data, defaultCategory.id));
		} else {
			// add
			dispatch(insertCategories(data));
		}
	};

	return (
		<>
			<div
				onClick={() => {
					onToggleFormCategory();
				}}
				className="fixed top-0 left-0 right-0 bottom-0 bg-[gray] opacity-40 z-10"
			></div>
			<div className="mx-auto w-full max-w-[550px] bg-white fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-10 rounded">
				<AiOutlineCloseCircle
					onClick={() => {
						onToggleFormCategory();
					}}
					className="absolute top-2 right-2 text-[30px] text-[#f54949] cursor-pointer hover:text-[red]"
				/>
				<form className="py-6 px-9" onSubmit={handleSubmit(onSubmit)}>
					<div className="mb-5">
						<label
							htmlFor="name"
							className="mb-3 block text-base font-medium text-[#07074D]"
						>
							Tên danh mục <span className="text-[red]">*</span>
						</label>
						<input
							{...register("name")}
							type="text"
							name="name"
							id="name"
							placeholder="Nhập tên danh mục"
							defaultValue={defaultCategory.name}
							className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
							onChange={(e) => onChangeNameCategory(e)}
						/>
						<p className="text-text-color-error mt-2">{errors.name?.message}</p>
					</div>
					<div className="mb-5">
						<label
							htmlFor="slug"
							className="mb-3 block text-base font-medium text-[#07074D]"
						>
							Slug danh mục <span className="text-[red]">*</span>
						</label>
						{!isTrue ? (
							<p className="text-text-color-title ml-0 pl-4 py-2 border rounded">
								{defaultCategory.slug}
							</p>
						) : (
							<p className="text-text-color-title ml-0 pl-4 py-2 border rounded">
								{slug}
							</p>
						)}
					</div>
					<div className="mb-5">
						<label
							htmlFor="description"
							className="mb-3 block text-base font-medium text-[#07074D]"
						>
							Mô tả:
						</label>
						<textarea
							{...register("description")}
							className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
							name="description"
							id="description"
							rows="3"
						></textarea>
						<p className="text-text-color-error mt-2">
							{errors.description?.message}
						</p>
					</div>
					<div>
						<button
							type="submit"
							className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base text-white outline-none"
						>
							Tạo
						</button>
					</div>
				</form>
			</div>
		</>
	);
}
Form.propTypes = {
	onToggleFormCategory: PropTypes.func,
	defaultCategory: PropTypes.object,
};
export default Form;
