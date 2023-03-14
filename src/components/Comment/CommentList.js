import React from "react";
import PropTypes from "prop-types";
import Avatar from "react-avatar";
import { confirmAlert } from "react-confirm-alert";

import { colors } from "./listColor";
import { formatTimeDate } from "../../ultits/dateTime";
import FormReply from "./FormReply";
import { useDispatch } from "react-redux";
import { deleteComment } from "../../api/commentApi";

CommentList.propTypes = {
	commentShow: PropTypes.array,
	onShowFormReply: PropTypes.func,
	user: PropTypes.object,
	onShowFormEdit: PropTypes.func,
	currenIdComment: PropTypes.number,
	idPost: PropTypes.number,
	listComment: PropTypes.array,
	setItemShow: PropTypes.any,
	itemShow: PropTypes.number,
};

function CommentList(props) {
	const {
		commentShow,
		onShowFormReply,
		user,
		onShowFormEdit,
		currenIdComment,
		idPost,
		listComment,
		setItemShow,
		itemShow,
	} = props;
	const dispatch = useDispatch();
	const onDeleteComment = (id) => {
		confirmAlert({
			title: `Vui Lòng xác nhận!`,
			message: (
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						marginTop: "4px",
					}}
				>
					Bạn có chắc chắn muốn xoá ?
				</div>
			),
			buttons: [
				{
					label: "Có",
					onClick: () => dispatch(deleteComment(id)),
				},
				{
					label: "Không",
				},
			],
		});
	};
	return (
		<ul className="max-h-[700px] overflow-y-auto pb-6">
			{commentShow?.map((item) => (
				<li key={item.id} className="border-b py-2">
					<div className="flex ">
						<Avatar
							size="50"
							round="50%"
							color={colors[Math.floor(Math.random() * colors.length)]}
							name={item.users.name}
						/>
						<div className="ml-2 w-full">
							<div className="flex">
								<span className="block text-[14px] text-text-color-title">
									{item.users.name}
								</span>
								<span className="block text-[12px] text-text-color-gray ml-4">
									{formatTimeDate(item.created_at)}
								</span>
							</div>
							<p className="text-text-color-gray text-[14px]">{item.content}</p>
							<div className="flex items-center">
								<span
									onClick={() => onShowFormReply(item.id)}
									className="mx-2 text-[#4444eb] text-[14px] cursor-pointer hover:text-[blue]"
								>
									Trả lời
								</span>
								{user?.id === item.user_id ? (
									<div>
										<span
											onClick={() => onShowFormEdit(item.id, item.content)}
											className="mx-2 text-[#ff1281] text-[14px] cursor-pointer hover:text-[#ff00d4]"
										>
											Chỉnh sửa
										</span>
										<span
											onClick={() => onDeleteComment(item.id)}
											className="mx-2 text-[#f44f13] text-[14px] cursor-pointer hover:text-[#ff1010]"
										>
											Xoá
										</span>
									</div>
								) : (
									false
								)}
							</div>
							{currenIdComment === item.id ? (
								<FormReply idPost={idPost} idParent={item.id} />
							) : (
								false
							)}
						</div>
					</div>
					<ul className="ml-10 border-l">
						{item.children?.map((itemChild) => (
							<li key={itemChild.id} className="flex py-2 border-t pl-1">
								<Avatar
									size="50"
									round="50%"
									color={colors[Math.floor(Math.random() * colors.length)]}
									name={itemChild.users.name}
								/>
								<div className="ml-2 flex flex-col justify-center ">
									<div className="flex">
										<span className="block text-[14px] text-text-color-title">
											{itemChild.users.name}
										</span>
										<span className="block text-[12px] text-text-color-gray ml-4">
											{formatTimeDate(itemChild.created_at)}
										</span>
									</div>
									<p className="text-text-color-gray text-[12px]">
										{itemChild.content}
									</p>
									{user?.id === itemChild.user_id ? (
										<div>
											<span
												onClick={() =>
													onShowFormEdit(itemChild.id, itemChild.content)
												}
												className="mx-2 text-[#f8b61d] text-[12px] cursor-pointer hover:text-[#ffdd00]"
											>
												Chỉnh sửa
											</span>
											<span
												onClick={() => onDeleteComment(itemChild.id)}
												className="mx-2 text-[#f44f13] text-[12px] cursor-pointer hover:text-[#ff1010]"
											>
												Xoá
											</span>
										</div>
									) : (
										false
									)}
								</div>
							</li>
						))}
					</ul>
				</li>
			))}
			{listComment?.length > 0 ? (
				<span
					onClick={() => setItemShow(itemShow + 4)}
					className="flex justify-center cursor-pointer text-text-color-title"
				>
					Xem thêm
				</span>
			) : (
				false
			)}
		</ul>
	);
}

export default React.memo(CommentList);
