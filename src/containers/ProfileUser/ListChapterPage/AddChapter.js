/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
// import PropTypes from "prop-types";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ProfileUser from "..";
import {
	addChapter,
	checkChapterIsBelongToUser,
	checkPostIsBelongToUser,
	updateChapter,
} from "../../../api/chapterApi";

AddChapter.propTypes = {};

function AddChapter(props) {
	const currentChapter = useSelector((state) => state.chapters.currentChapter);
	const [content, setContent] = useState(
		currentChapter ? currentChapter.content : ""
	);
	const location = useLocation();
	const param = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const isAddChapter = location.pathname
		.split("/")
		.some((name) => name === "add-chapter");
	const defaultValue = {
		chapterNumber: currentChapter ? currentChapter.chapter_number : "",
		title: currentChapter ? currentChapter.title : "",
		content: currentChapter ? currentChapter.content : "",
	};
	useEffect(() => {
		if (isAddChapter) {
			dispatch(checkPostIsBelongToUser(param.id, navigate)); //if true next, false return back
			// lay id post
			// gui len server co duoc quyen them chuong cho bai post nay k
		} else {
			dispatch(checkChapterIsBelongToUser(param.id, navigate));
			// lay id cua chapter gui len xem co duoc quyen chinh sua chapter nay hay khong
			// neu duoc quyen chinh sua thi dispatch cho curren chapter
		}
	}, [dispatch]);

	const schema = yup
		.object()
		.shape({
			chapterNumber: yup
				.number()
				.typeError("Số chương phải là kiểu số!")
				.required("Số chương không được để trống!")
				.positive(),
			title: yup.string().required("Tên chương không được để trống!"),
			// description: yup.string().max(5, "<1000 ký tự!"),
		})
		.required();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});
	function checkContent(content) {
		if (content.length < 100) {
			alert("Nội dung bài viết phải lớn hơn 100 ký tự!");
			return false;
		}
		return true;
	}
	const onSubmit = (data) => {
		if (currentChapter) {
			if (checkContent(content)) {
				const idChapter = param.id;
				data.content = content;
				dispatch(updateChapter(data, idChapter, navigate));
			}
		} else {
			if (checkContent(content)) {
				const idPost = param.id;
				data.content = content;
				dispatch(addChapter(data, idPost, navigate));
			}
		}
	};

	return (
		<ProfileUser>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="bg-[white] mx-2 px-6 py-2 mt-2"
			>
				<strong className="bg-[#1abd1a] p-2 rounded text-center text-text-color-white mt-4 block max-w-[300px]">
					Thêm chương cho [ewjhekwehkj]
				</strong>
				<div className="flex gap-2 mt-4 sm:block md:block">
					<div>
						<label className="text-text-color-gray" htmlFor="number">
							Chương số:
						</label>
						<input
							id="number"
							name="chapterNumber"
							{...register("chapterNumber")}
							className="block text-[14px] py-2 px-1 rounded focus:outline-none border"
							type="number"
							placeholder="nhập số chương"
							defaultValue={defaultValue.chapterNumber}
						/>
						<p className="text-[red] mb-2">{errors.number?.message}</p>
					</div>
					<div className="w-full">
						<label htmlFor="title">Tên chương:</label>
						<input
							id="title"
							name="title"
							{...register("title")}
							className="block w-[90%] text-[14px] py-2 px-1 rounded focus:outline-none border"
							type="text"
							placeholder="nhập tên chương"
							defaultValue={defaultValue.title}
						/>
						<p className="text-[red] mb-2">{errors.title?.message}</p>
					</div>
				</div>

				<p className="border border-[#65cdfa] p-2 bg-[#9de0fd] text-center my-4 rounded text-[14px]">
					Nội dung chương phải ít nhất 100 từ. Khuyến khích 1 chương khoảng 500
					từ
				</p>
				<span className="mb-2 block">Nội dung chương:</span>
				<CKEditor
					onChange={(event, editor) => {
						const data = editor.getData();
						setContent(data);
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
					data={content}
				/>
				<button
					type="submit"
					className="my-4 bg-[green] hover:bg-[#17cc17] h-[50px] w-[200px] rounded-[30px] text-text-color-white"
				>
					Lưu
				</button>
			</form>
		</ProfileUser>
	);
}

export default AddChapter;
