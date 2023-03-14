import React from "react";
import { useForm } from "react-hook-form";
import { AiFillCloseCircle } from "react-icons/ai";

import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { updateComment } from "../../api/commentApi";

function FormEdit(props) {
	const { onCloseFormEdit, idCommentNeedUpdate, defaultValue } = props;
	const dispatch = useDispatch();
	const { register, handleSubmit } = useForm();
	const onSubmit = (data) => {
		if (data.content.length < 3) {
			alert("Bình luận phải có ít nhất 3 ký tự");
		} else {
			dispatch(updateComment(idCommentNeedUpdate, data));
		}
	};
	return (
		<>
			<div
				onClick={() => onCloseFormEdit()}
				className="fixed top-0 bottom-0 left-0 right-0 bg-[#ccc] opacity-[0.2] z-[100]"
			></div>
			<form
				className="py-6 px-9 fixed bg-white z-[200] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
				onSubmit={handleSubmit(onSubmit)}
			>
				<AiFillCloseCircle
					onClick={() => onCloseFormEdit()}
					className="absolute top-2 right-2 text-[26px] text-[#ef1d1d] cursor-pointer hover:text-[red]"
				/>
				<div className="mb-5">
					<label
						htmlFor="name"
						className="mb-3 block text-base font-medium text-[#07074D]"
					>
						Chỉnh sửa bình luận <span className="text-[red]">*</span>
					</label>
					<textarea
						{...register("content")}
						name="content"
						id=""
						placeholder="Nhập bình luận"
						defaultValue={defaultValue ? defaultValue : ""}
						className="border-[#ccc] border w-full rounded p-2 focus:outline-none bg-[#f3f1f1]"
					></textarea>
				</div>

				<div>
					<button
						type="submit"
						className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base text-white outline-none"
					>
						Cập nhật
					</button>
				</div>
			</form>
		</>
	);
}
FormEdit.propTypes = {
	onCloseFormEdit: PropTypes.func,
	idCommentNeedUpdate: PropTypes.number,
};
export default FormEdit;
