import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function ShortBlog(props) {
	const { shortBlogList } = props;
	const navigate = useNavigate();
	const onViewDetail = (slug) => {
		navigate(`view/${slug}`);
	};
	return (
		<div className="bg-white rounded mb-2">
			<h2 className="text-text-color-title pl-2 my-2 text-xl w-full border-b-[1px] border-solid border-[#ccc] py-2">
				Blogs ngắn
			</h2>
			<ul className="grid grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-4 ">
				{shortBlogList?.map((item) => (
					<li
						key={item.id}
						onClick={() => {
							onViewDetail(item.slug);
						}}
						className="flex cursor-pointer group"
					>
						<img
							className="w-[120px] max-h-[100px]"
							src={item.image}
							alt="ewewe"
						/>
						<div className="ml-2 text-text-color-gray  ">
							<span className="text-[14px] group-hover:text-text-color-title">
								{item.name}
							</span>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
}
ShortBlog.propTypes = {
	shortBlogList: PropTypes.array,
};
export default ShortBlog;
