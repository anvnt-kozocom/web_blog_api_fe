import React from "react";
import PropTypes from "prop-types";
import { AiFillFolderOpen } from "react-icons/ai";
import ReactPaginate from "react-paginate";
import { useDispatch } from "react-redux";
import { fetchListChapter } from "../../api/readApi";
import { useNavigate } from "react-router-dom";

function ListChapter(props) {
	const { listChapter, countPageChapter, param } = props;
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const onReadChapter = (slug) => {
		navigate(`/read/${param.slug}/${slug}`);
	};
	const handlePageClick = (event) => {
		dispatch(fetchListChapter(param.slug, event.selected + 1));
	};
	return (
		<div className="my-[20px] bg-white p-4">
			<h1 className="flex items-center text-text-color-title text-[20px]">
				<AiFillFolderOpen className="mr-1" />
				Danh sách chương
			</h1>
			<ul>
				{listChapter?.map((item) => (
					<li
						onClick={() => onReadChapter(item.slug_chapter)}
						key={item.id}
						className="hover:bg-[#ccc] cursor-pointer hover:text-text-color-title px-2 py-1 text-text-color-gray text-[16px] border-b border-dashed border-[#ccc]"
					>
						Chương {item.chapter_number} - {item.title}
					</li>
				))}
			</ul>
			<ReactPaginate
				breakLabel="..."
				nextLabel=">"
				onPageChange={(event) => {
					handlePageClick(event);
				}}
				pageRangeDisplayed={2}
				pageCount={countPageChapter ? countPageChapter : 1}
				previousLabel="<"
				renderOnZeroPageCount={null}
				className="flex justify-center gap-3 mt-4 flex-wrap"
				pageClassName="hover:bg-[#ccc] cursor-pointer w-[40px] h-[40px] border border-gray-300 rounded-full flex justify-center items-center"
				pageLinkClassName="text-[red] p-4"
				previousClassName="hover:bg-[#ccc] cursor-pointer w-[40px] h-[40px] border border-gray-300 rounded-full flex justify-center items-center"
				nextClassName="p-4 hover:bg-[#ccc] cursor-pointer w-[40px] h-[40px] border border-gray-300 rounded-full flex justify-center items-center"
				activeClassName="bg-[#46ee6c]"
				previousLinkClassName="p-4"
				nextLinkClassName="p-4"
			/>
		</div>
	);
}
ListChapter.propTypes = {
	listChapter: PropTypes.array,
	countPageChapter: PropTypes.number,
	param: PropTypes.object,
};
export default ListChapter;
