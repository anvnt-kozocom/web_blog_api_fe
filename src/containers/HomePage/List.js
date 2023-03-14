import React from "react";
import PropTypes from "prop-types";
import { AiOutlineEye, AiFillStar, AiOutlineDown } from "react-icons/ai";
import { BiComment } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";

function List(props) {
	const { listList } = props;
	const navigate = useNavigate();
	const onViewDetail = (slug) => {
		navigate(`view/${slug}`);
	};
	return (
		<div className="bg-white rounded mb-2">
			<h2 className="text-text-color-title pl-2 my-2 text-xl w-full border-b-[1px] border-solid border-[#ccc] py-2">
				Danh sách
			</h2>
			<ul>
				{listList?.map((item) => (
					<li
						key={item.id}
						onClick={() => onViewDetail(item.slug)}
						className="hover:bg-[#ccc] transition-all duration-300 cursor-pointer group flex justify-between p-4 text-text-color-gray border-b-[1px] border-solid border-[#ccc]"
					>
						<strong className="group-hover:text-text-color-title  transition-all duration-500">
							{item.name}
						</strong>
						<div className="flex items-center text-[14px]">
							<span className="flex items-center mx-1">
								<AiOutlineEye className="mr-1" />
								{item.view}
							</span>
							<span className="flex mx-1">
								<AiFillStar />
								<AiFillStar />
								<AiFillStar />
								<AiFillStar />
							</span>
							<span className="mx-1 flex items-center">
								<BiComment className="mr-1" />
								{item.comment_count}
							</span>
						</div>
					</li>
				))}
			</ul>
			<Link
				to="/filter/tat-ca"
				className="flex mb-4 w-[120px] h-[40px] cursor-pointer hover:text-text-color-title hover:bg-[#dddbdb] my-4 p-1 justify-center m-auto rounded-[20px] items-center bg-slate-400 text-text-color-white"
			>
				Xem thêm <AiOutlineDown className="text-[12px]" />
			</Link>
			<div className="h-[20px]"></div>
		</div>
	);
}
List.propTypes = {
	listList: PropTypes.array,
};
export default List;
