/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { BiComment } from "react-icons/bi";
import { postComment } from "../../api/commentApi";
import { useDispatch, useSelector } from "react-redux";
import { setCurrenIdComment } from "../../slice/comment";
import { isLogged } from "../../api/auth";
import FormEdit from "./FormEdit";
import CommentList from "./CommentList";

function Comment(props) {
	const { listComment, idPost } = props;
	const currenIdComment = useSelector((state) => state.comment.currenIdComment);
	const [itemShow, setItemShow] = useState(4);
	const [commentShow, setCommentShow] = useState([]);
	const [isShowFormEdit, setIsShowFormEdit] = useState(false);
	const [user, setUser] = useState(null);
	const [idCommentNeedUpdate, setIdCommentNeedUpdate] = useState(0);
	const [defaulvalueComment, setDefaulvalueComment] = useState("");
	const inputCommentRef = useRef("");
	const formRef = useRef();
	console.log(commentShow);
	const dispatch = useDispatch();
	useEffect(() => {
		setCommentShow(listComment?.slice(0, itemShow));
		if (isLogged()) {
			setUser(JSON.parse(localStorage.getItem("user")));
		}
	}, [itemShow, listComment]);
	const onChangeInputComment = useCallback((e) => {
		inputCommentRef.current = e.target.value;
	}, []);
	const onCloseFormEdit = useCallback(
		(e) => {
			setIsShowFormEdit(false);
		},
		[isShowFormEdit]
	);

	const onShowFormEdit = useCallback(
		(id, content) => {
			setIsShowFormEdit(true);
			setIdCommentNeedUpdate(id);
			setDefaulvalueComment(content);
		},
		[isShowFormEdit]
	);
	const onSubmitComment = () => {
		const comment = inputCommentRef.current;
		if (comment.length < 3) {
			alert("Bình luận phải lớn hơn 3 ký tự");
		} else {
			const data = {
				content: comment,
				postId: idPost,
			};
			dispatch(postComment(data));
			inputCommentRef.current = "";
			formRef.current.reset("");
		}
	};
	const onShowFormReply = (id) => {
		dispatch(setCurrenIdComment(id));
	};
	return (
		<div className="my-[20px] bg-white p-4">
			{isShowFormEdit ? (
				<FormEdit
					onCloseFormEdit={onCloseFormEdit}
					idCommentNeedUpdate={idCommentNeedUpdate}
					defaultValue={defaulvalueComment}
				/>
			) : (
				false
			)}
			<h2 className="flex items-center p-0 my-2 text-[#362ddb] text-[20px] border-b ">
				<BiComment className="mr-1 " />
				Bình luận
			</h2>
			<form ref={formRef}>
				<textarea
					ref={inputCommentRef}
					className="border-[#ccc] border w-full rounded p-2 focus:outline-none bg-[#f3f1f1]"
					placeholder="Nhập bình luận"
					rows="4"
					onChange={(e) => onChangeInputComment(e)}
				></textarea>
				<input
					type="button"
					onClick={() => onSubmitComment()}
					value="Gửi"
					className="bg-[#9683f4] cursor-pointer hover:bg-[#6547ff] text-text-color-white w-[150px] h-[30px] rounded-lg my-2"
				/>
			</form>
			<CommentList
				commentShow={commentShow}
				onShowFormReply={onShowFormReply}
				user={user}
				onShowFormEdit={onShowFormEdit}
				currenIdComment={currenIdComment}
				idPost={idPost}
				listComment={listComment}
				setItemShow={setItemShow}
				itemShow={itemShow}
			/>
		</div>
	);
}
Comment.propTypes = {
	listComment: PropTypes.array,
	idPost: PropTypes.number,
};
export default React.memo(Comment);
