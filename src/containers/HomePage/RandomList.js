import React from "react";
import PropTypes from "prop-types";
import { AiOutlineEye, AiFillStar, AiOutlineDown } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function RandomList(props) {
	const { randomList } = props;
	const navigate = useNavigate();

	const onViewDetail = (slug) => {
		navigate(`view/${slug}`);
	};
	return (
		<div className="bg-white rounded mb-2">
			<h2 className="text-text-color-title pl-2 my-2 text-xl w-full border-b-[1px] border-solid border-[#ccc] py-2">
				NGẪU NHIÊN
			</h2>
			<div className="grid grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 ">
				{randomList?.map((item) => (
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
			<div className="h-[20px]"></div>
		</div>
	);
}
RandomList.propTypes = {
	randomList: PropTypes.array,
};
export default RandomList;
