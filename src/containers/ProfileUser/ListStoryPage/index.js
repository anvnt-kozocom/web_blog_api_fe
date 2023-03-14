import React, { useEffect } from "react";
// import PropTypes from "prop-types";
import { AiFillEdit, AiOutlineDelete, AiOutlineFileAdd } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import RingLoader from "react-spinners/RingLoader";
import ProfileUser from "..";
import { deletePost, fetchPostsOfUser } from "../../../api/postApi";
import { setCurrentPost } from "../../../slice/posts";
import { uppercaseFirstString } from "../../../ultits";
// import { base_url_image } from "../../../ultits/variable";

function ListStoryPage(props) {
	const postsOfUser = useSelector((state) => state.posts.postsOfUser);
	const isLoadding = useSelector((state) => state.posts.isLoadding);

	const navigate = useNavigate();
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchPostsOfUser());
	}, [dispatch]);

	const onAddNewStory = () => {
		dispatch(setCurrentPost(null));
		navigate("/profile/add/story");
	};
	const onUpdateStory = (item) => {
		dispatch(setCurrentPost(item));
		navigate("/profile/update/story");
	};
	const ondeletePost = (id, name) => {
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
					Bạn có chắc chắn muốn xoá
					<span style={{ color: "red", marginLeft: "4px" }}>{name}</span> ?
				</div>
			),
			buttons: [
				{
					label: "Có",
					onClick: () => dispatch(deletePost(id)),
				},
				{
					label: "Không",
				},
			],
		});
	};
	const CSSProperties = {
		display: "flex",
		margin: "auto",
		justifyContent: "center",
		alignItems: "center",
	};
	return (
		<>
			<ProfileUser>
				<div className="overflow-hidden rounded-lg border min-h-[400px] flex justify-center items-center border-gray-200 shadow-md m-5">
					{isLoadding ? (
						<RingLoader
							color="#01b22a"
							loading={true}
							cssOverride={CSSProperties}
							size={100}
							aria-label="Loading Spinner"
							data-testid="loader"
						/>
					) : (
						<table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
							<thead className="bg-gray-50">
								<tr>
									<th
										scope="col"
										className="px-6 py-4 font-medium text-gray-900"
									>
										Thông tin
									</th>
									<th
										scope="col"
										className="px-6 py-4 font-medium text-gray-900"
									>
										Trạng thái
									</th>
									<th
										scope="col"
										className="px-6 py-4 font-medium text-gray-900"
									>
										Mô tả
									</th>
									<th
										scope="col"
										className="px-6 py-4 font-medium min-w-[150px] hover:text-text-color-title p-2 text-[blue] cursor-pointer"
									>
										<span onClick={() => onAddNewStory()}>THÊM MỚI +</span>
									</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-gray-100 border-t border-gray-100">
								{postsOfUser?.map((item) => (
									<tr key={item.id} className="hover:bg-gray-50">
										<th className="flex min-w-[250px] gap-3 px-4 py-4 font-normal text-gray-900">
											<img
												className="h-[100px] w-[80px] object-cover object-center"
												// src={base_url_image`${item.image}`}
												// src={`${base_url_image}/${item.image}`}
												alt={item.name}
												title={item.name}
											/>
											<div className="text-sm w-full">
												<div className="font-medium text-gray-700">
													{uppercaseFirstString(item.name)}
												</div>
												<span className=" text-green-600">Hoàn thành</span>
												<span className="block text-text-color-gray text-[12px]">
													Lượt xem : {item.view}
												</span>
												<span className="block text-text-color-gray text-[12px]">
													Số chương : {item.chapters_count}
												</span>
												<span
													onClick={() => onUpdateStory(item)}
													className="flex items-center text-[orange] cursor-pointer hover:text-text-color-title"
												>
													<AiFillEdit className="mr-1" /> Sửa thông tin
												</span>
											</div>
										</th>
										<td className="px-2 py-2 w-[90px] ">
											<span
												className={`inline-flex justify-center w-[90px] items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold ${
													item.status === "active"
														? "text-green-600"
														: "text-red-600"
												}`}
											>
												<span className="h-1.5 w-1.5 rounded-full bg-green-600" />
												{item.status}
											</span>
										</td>
										<td className="px-6 py-4">
											<div className="flex gap-2">
												<p
													dangerouslySetInnerHTML={{ __html: item.description }}
												></p>
											</div>
										</td>
										<td className="px-4 py-4">
											<div className="justify-end gap-4">
												<span
													onClick={() => ondeletePost(item.id, item.name)}
													className="flex items-center text-[#f77373] my-2 cursor-pointer hover:text-[#ff0202]"
												>
													<AiOutlineDelete />
													Xoá
												</span>
												<Link
													to={`/profile/list-chapter/${item.id}`}
													className="text-[14px] flex items-center my-2 text-text-color-title cursor-pointer hover:text-[blue]"
												>
													<AiOutlineFileAdd />
													Xem chương
												</Link>
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					)}
				</div>
			</ProfileUser>
		</>
	);
}
ListStoryPage.propTypes = {};
export default ListStoryPage;
