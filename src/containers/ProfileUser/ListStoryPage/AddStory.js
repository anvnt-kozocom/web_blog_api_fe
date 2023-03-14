import React, { useEffect, useState } from "react";
// import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useNavigate } from "react-router-dom";
import ProfileUser from "..";
import { fetchCategories } from "../../../api/categoryApi";
import { addPost, updatePost } from "../../../api/postApi";
import { base_url_image } from "../../../ultits/variable.js";

function AddStory(props) {
	const categories = useSelector((state) => state.categories.categories);
	const currentPost = useSelector((state) => state.posts.currentPost);
	const [description, setDescription] = useState(
		currentPost ? currentPost.description : ""
	);
	const [image, setImage] = useState(
		currentPost ? base_url_image + "/" + currentPost.image : null
	);
	const [isImageInForm, setIsImageInForm] = useState({
		status: false,
		message: "",
	});

	const dispatch = useDispatch();
	const navigate = useNavigate();
	useEffect(() => {
		dispatch(fetchCategories());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const schema = yup
		.object()
		.shape({
			name: yup.string().required("Tên không được để trống!"),
			nameAuthor: yup.string().required("Tên tác giả không được để trống!"),
			type: yup.number().integer().required("Không được để trống!"),
			is_done: yup.number().integer().required("Không được để trống!"),
			description: yup.string().max(5, "<1000 ký tự!"),
			categories: yup
				.array("Không được để trống!")
				.typeError("Phải chọn ít nhất 1 danh mục")
				.of(yup.string())
				// .transform((currentValue) => currentValue.map(Number))
				.test("is-checked", "Phải chọn ít nhất 1 danh mục", (value) => {
					return value !== false && value.length > 0;
				}),
			image: yup
				.mixed()
				.test("fileSize", "kích thước phải nhỏ hơn 500kb", (value) => {
					if (!value.length) return true;
					return value[0].size <= 500000;
				}),
		})
		.required();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		const reader = new FileReader();
		reader.onloadend = () => {
			setImage(reader.result);
		};
		reader.readAsDataURL(file);
	};

	const defaultValue = {
		name: currentPost ? currentPost.name : "",
		nameAuthor: currentPost ? currentPost.author : "",
		type: currentPost ? currentPost.type : null,
		is_done: currentPost ? currentPost.is_done : null,
		image: currentPost ? currentPost.image : null,
		categories: currentPost ? currentPost.categories : [],
		description: currentPost ? currentPost.description : "",
	};

	const onSubmit = (data) => {
		data.description = description;
		data.categories = data.categories.map((item) => parseInt(item));

		const formData = new FormData();
		formData.append("image", data.image[0]);
		for (const key in data) {
			formData.append(key, data[key]);
		}
		data.categories.forEach((category) => {
			formData.append("categories[]", category);
		});

		formData.append("is_done", parseInt(data.is_done));
		formData.append("type", parseInt(data.type));

		if (!currentPost) {
			if (!data.image.length) {
				setIsImageInForm({
					status: false,
					message: "Bắt buộc phải có ảnh < 500kb và thuộc ('jpeg,png,jpg')",
				});
			} else {
				if (data.image[0].size > 500000) {
					setIsImageInForm({
						status: false,
						message: "Bắt buộc phải có ảnh < 500kb và thuộc ('jpeg,png,jpg')",
					});
				} else {
					setIsImageInForm({
						status: false,
						message: "",
					});
					dispatch(addPost(formData, navigate));
				}
			}
		} else {
			dispatch(updatePost(formData, currentPost.id, navigate));
		}
	};

	return (
		<ProfileUser>
			<form
				action=""
				className="w-full bg-white"
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className="flex flex-row">
					<div className="basis-3/4 px-4">
						<input
							{...register("name")}
							defaultValue={defaultValue.name}
							name="name"
							className="w-full text-[20px] sm:text-[14px] sm:h-[40px] my-4 h-[60px] px-4 py-2 border-[1px] border-solid border-[#ccc] focus:outline-none focus:border-sky-500 focus:shadow-md rounded-[10px] "
							type="text"
							placeholder="Nhập tên truyện tại đây"
						/>
						<p className="text-[red] mb-2">{errors.name?.message}</p>
						<div className="flex flex-row md:block sm:block">
							<div className="basis-2/3 ">
								<div className="">
									<strong>Tác giả</strong>
									<input
										{...register("nameAuthor")}
										type="text"
										defaultValue={defaultValue.nameAuthor}
										className="w-full text-[14px] my-2  px-4 py-2 border-[1px] border-solid border-[#ccc] focus:outline-none focus:border-sky-500 focus:shadow-md rounded-[10px] "
										placeholder="Tên tác giả"
									/>
									<p className="text-[red] mb-2">
										{errors.nameAuthor?.message}
									</p>
								</div>
								<div className="">
									<strong>Loại</strong>
									<div>
										<label className="block cursor-pointer">
											<input
												className="m-2"
												type="radio"
												value={0}
												defaultChecked={defaultValue.type === 0 ? true : true}
												{...register("type")}
											/>
											Dịch
										</label>
										<label className="block cursor-pointer">
											<input
												className="m-2"
												type="radio"
												value={1}
												defaultChecked={defaultValue.type === 1 ? true : false}
												{...register("type")}
											/>
											Sáng tác
										</label>
									</div>
									<p className="text-[red] mb-2">{errors.type?.message}</p>
								</div>
								<div>
									<strong>Tình trạng</strong>
									<div className="flex sm:block">
										<label className="block cursor-pointer">
											<input
												className="m-2"
												type="radio"
												value={0}
												defaultChecked={
													defaultValue.is_done === 0 ? true : true
												}
												{...register("is_done")}
											/>
											Đã hoàn thành
										</label>
										<label className="block cursor-pointer">
											<input
												className="m-2"
												type="radio"
												value={1}
												defaultChecked={
													defaultValue.is_done === 1 ? true : false
												}
												{...register("is_done")}
											/>
											Chưa xong
										</label>
									</div>
									<p className="text-[red] mb-2">{errors.status?.message}</p>
								</div>
							</div>
							<div className="basis-1/3 px-4">
								<input
									type="file"
									{...register("image")}
									name="image"
									className="text-[14px] w-[108px] max-w-[100px] overflow-hidden"
									onChange={handleImageChange}
								/>
								<p className="text-[red] mb-2">{errors.image?.message}</p>
								{isImageInForm.status ? (
									false
								) : (
									<p className="text-[red] mb-2 mt-2">
										{isImageInForm.message}{" "}
									</p>
								)}

								{/* <p className="text-[red] mb-2 mt-2">{errors.image?.message}</p> */}
								<span className="text-text-color-gray text-[14px]">
									Hỗ trợ ảnh jpg,jpeg,png và có kích thước nhỏ hơn 500kb
								</span>
								<div className="h-[150px] ">
									{image ? (
										// eslint-disable-next-line jsx-a11y/img-redundant-alt
										<img
											src={image}
											className="h-[150px] rounded"
											alt="Selected image"
										/>
									) : (
										false
									)}
								</div>
							</div>
						</div>
					</div>
					<div className="basis-1/4 py-4 text-text-color-gray max-h-[400px] ">
						<strong className="my-[10px] block sm:text-[12px]">
							Chọn danh mục
						</strong>
						<div className="max-h-[300px] overflow-auto">
							{categories
								? categories.map((item) => (
										<p
											key={item.id}
											className="my-1 group flex text-[14px] sm:text-[10px]"
										>
											<input
												id={`category` + item.id}
												className="mx-1"
												type="checkbox"
												name="categories[]"
												{...register("categories")}
												value={item.id}
												defaultChecked={
													currentPost
														? currentPost.categories.some(
																(cate) => cate.id === item.id
														  )
														: false
												}
											/>
											<label
												htmlFor={`category` + item.id}
												className="cursor-pointer group-hover:text-text-color-title w-[100%] flex "
											>
												{item.name}
											</label>
										</p>
								  ))
								: false}
						</div>
						<p className="text-[red] mb-2 mt-2">{errors.categories?.message}</p>
					</div>
				</div>
				<p className="text-[red] mb-2 mt-2">{errors.description?.message}</p>
				{errors.description && (
					<p className="text-[red] mb-2 mt-2">{errors.description.message}</p>
				)}
				<p className="text-text-color-gray text-[14px]">Mô tả</p>
				<CKEditor
					{...register("description")}
					onChange={(event, editor) => {
						const data = editor.getData();
						setDescription(data);
					}}
					onBlur={(event, editor) => {}}
					config={{
						toolbar: {
							shouldNotGroupWhenFull: true,
							items: [
								"heading",
								"link",
								"bold",
								"italic",
								"|",
								"undo",
								"redo",
								"|",
								"numberedList",
								"bulletedList",
							],
						},
					}}
					editor={ClassicEditor}
					data={description}
				/>
				<button
					className="w-[150px] p-1 bg-text-color-title hover:bg-[#036703] text-text-color-white rounded-[10px] my-4"
					type="submit"
				>
					{currentPost ? "Cập nhật bài viết" : "Tạo bài viết"}
				</button>
			</form>
		</ProfileUser>
	);
}
AddStory.propTypes = {};
export default AddStory;
