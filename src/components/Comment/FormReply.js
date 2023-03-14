import React from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { postComment } from "../../api/commentApi";
import { isLogged } from "../../api/auth";
import { toast } from "react-toastify";

function FormReply(props) {
	const { idPost, idParent } = props;
	const { register, handleSubmit, reset } = useForm();
	const dispatch = useDispatch();
	const onSubmit = (data) => {
		if (isLogged()) {
			if (data.content.length < 3) {
				alert("Bình luận phải lớn hơn 3 ký tự");
			} else {
				const newData = {
					...data,
					postId: idPost,
					idParent: idParent,
				};
				dispatch(postComment(newData));
				reset();
			}
		} else {
			toast.error("Bạn phải đăng nhập thì mới có thể bình luận!", {
				position: toast.POSITION.TOP_RIGHT,
				autoClose: 4000,
			});
		}
	};
	return (
		<form className="formRepply" onSubmit={handleSubmit(onSubmit)}>
			<textarea
				{...register("content")}
				className="border-[#ccc] h-[60px] border w-[50%] rounded p-2 focus:outline-none bg-[#f3f1f1]"
			></textarea>
			<input
				type="submit"
				value="Gửi bình luận"
				className="reply bg-[#9683f4] block cursor-pointer hover:bg-[#6547ff] text-text-color-white w-[150px] h-[30px] rounded-lg my-2"
			/>
		</form>
	);
}
FormReply.propTypes = {
	idPost: PropTypes.number,
	idParent: PropTypes.number,
};
export default FormReply;
