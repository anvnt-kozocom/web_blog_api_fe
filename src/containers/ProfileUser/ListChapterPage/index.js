/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";

// import PropTypes from 'prop-types';
import ProfileUser from "..";
import { deleteChapter, fetchChapterOfUser } from "../../../api/chapterApi";
import { setCurrentChapter } from "../../../slice/chapters";

function ListChapterPage(props) {
	const param = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const listChapter = useSelector((state) => state.chapters.chapters);
	useEffect(() => {
		dispatch(fetchChapterOfUser(param.id, navigate));
	}, [dispatch, param]);

	const onUpdateChapter = (item) => {
		dispatch(setCurrentChapter(item));
		navigate(`/profile/update-chapter/${item.id}`);
	};
	const onAddChapter = () => {
		dispatch(setCurrentChapter(null));
	};
	const onDeleteChapter = (id, name) => {
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
					onClick: () => dispatch(deleteChapter(id)),
				},
				{
					label: "Không",
				},
			],
		});
	};
	return (
		<ProfileUser>
			<div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
				<p className="text-text-color-gray mx-6 text-[16px] my-2">
					Xem danh sách chương của [
					<span className="text-text-color-title mx-2">
						{listChapter?.name}
					</span>
					]
				</p>
				<table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
					<thead className="bg-gray-50">
						<tr>
							<th scope="col" className="px-6 py-4 font-medium text-gray-900">
								Chương
							</th>
							<th scope="col" className="px-6 py-4 font-medium text-gray-900">
								Tên chương
							</th>
							<th scope="col" className="px-6 py-4 font-medium text-gray-900">
								Mô tả
							</th>
							<th
								scope="col"
								className="px-6 py-4 font-medium min-w-[150px] hover:text-text-color-title p-2 text-[blue] cursor-pointer"
							>
								<Link
									onClick={() => onAddChapter()}
									to={`/profile/add-chapter/${param.id}`}
									className="float-right"
								>
									THÊM MỚI +
								</Link>
							</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-100 border-t border-gray-100">
						{listChapter?.chapters?.map((item) => (
							<tr key={item.id} className="hover:bg-gray-50">
								<td className="px-4 py-4">Chương: {item.chapter_number}</td>
								<td className="px-2 py-2 w-[90px]">{item.title}</td>
								<td className="px-6 py-4 text-text-color-title">
									FREE - {item.status}
								</td>
								<td className="px-4 py-4 ">
									<div className="flex flex-wrap justify-center">
										<Link
											to={`/read/${item.id}/${item.slug_chapter}`}
											target="_blank"
											className="flex  justify-center my-1 items-center p-2 border hover:bg-[#ccc] hover:text-text-color-title border-[#ccc] rounded-[20px] mx-2 cursor-pointer"
										>
											<AiOutlineEye /> Xem
										</Link>
										<span
											onClick={() => onUpdateChapter(item)}
											className="flex justify-center my-1 items-center p-2 rounded-[20px] bg-[#67f367] hover:bg-[#07ae07] hover:text-text-color-white mx-2 cursor-pointer text-text-color-gray"
										>
											<AiOutlineEdit /> <span>Chỉnh sửa</span>
										</span>
										<span
											onClick={() => onDeleteChapter(item.id, item.title)}
											className="flex  justify-center my-1 items-center p-2 px-4 rounded-[20px] text-text-color-white cursor-pointer mx-2 bg-[#cb2222] hover:bg-[red] hover:text-text-color-white"
										>
											<AiOutlineDelete />
											Xoá
										</span>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</ProfileUser>
	);
}
ListChapterPage.propTypes = {};
export default ListChapterPage;
