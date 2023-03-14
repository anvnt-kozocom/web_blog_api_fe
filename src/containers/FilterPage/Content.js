import React from "react";
import PropTypes from "prop-types";
import { AiFillStar, AiOutlineEye } from "react-icons/ai";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostWithFilter } from "../../api/filterApi";

function Content(props) {
	const { posts, countPage } = props;
	const q = useSelector((state) => state.filter.valueSearch);
	const param = useParams();
	const location = useLocation();
	const navigate = useNavigate();
	const getUrl = location.pathname.split("/");
	const dispatch = useDispatch();
	const onViewDetail = (slug) => {
		navigate(`/view/${slug}`);
	};
	const handlePageClick = (event) => {
		// dispatch(setLoadding(true));
		let data = {
			_limit: 20,
			page: event.selected + 1,
		};
		if (getUrl.includes("search")) {
			data.q = q;
		} else {
			data.slug = param.slug;
		}
		dispatch(fetchPostWithFilter(data));
	};
	return (
		<>
			<>
				<div className="grid grid-cols-5 md:grid-cols-4 sm:grid-cols-2 gap-4 px-4">
					{posts?.map((item) => (
						<div
							key={item.id}
							onClick={() => onViewDetail(item.slug)}
							className="rounded overflow-hidden cursor-pointer"
						>
							<img className="h-[300px]" src={item.image} alt={item.name} />
							<p className="text-center p-2 text-text-color-gray text-[16px]">
								{item.name}
							</p>
							<span className="flex items-center justify-center p-1">
								<AiOutlineEye /> <span>{item.view}</span>
								<span className="flex ml-1">
									<AiFillStar className="text-[#f5a91c]" />
									<AiFillStar className="text-[#f5a91c]" />
									<AiFillStar className="text-[#f5a91c]" />
									<AiFillStar className="text-[#f5a91c]" />
								</span>
							</span>
						</div>
					))}
				</div>
			</>
			<ReactPaginate
				breakLabel="..."
				nextLabel=">"
				onPageChange={(event) => {
					handlePageClick(event);
				}}
				pageRangeDisplayed={2}
				pageCount={countPage ? countPage : 1}
				previousLabel="<"
				renderOnZeroPageCount={null}
				className="flex justify-center gap-3 mt-4 flex-wrap pb-[20px]"
				pageClassName="hover:bg-[#ccc] cursor-pointer w-[40px] h-[40px] border border-gray-300 rounded-full flex justify-center items-center"
				pageLinkClassName="text-[red] p-4"
				previousClassName="hover:bg-[#ccc] cursor-pointer w-[40px] h-[40px] border border-gray-300 rounded-full flex justify-center items-center"
				nextClassName="p-4 hover:bg-[#ccc] cursor-pointer w-[40px] h-[40px] border border-gray-300 rounded-full flex justify-center items-center"
				activeClassName="bg-[#46ee6c]"
				previousLinkClassName="p-4"
				nextLinkClassName="p-4"
			/>
		</>
	);
}
Content.propTypes = {
	posts: PropTypes.array,
	countPage: PropTypes.number,
};
export default Content;
