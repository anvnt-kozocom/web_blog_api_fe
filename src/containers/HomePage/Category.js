import React from "react";
import PropTypes from "prop-types";
import { IoIosHeartEmpty } from "react-icons/io";
import { Link } from "react-router-dom";
import { uppercaseCapitalize } from "../../ultits";

function Category(props) {
	const { categories } = props;
	return (
		<div className="bg-white min-h-[400px] rounded mb-2">
			<h2 className="text-text-color-title text-center my-2 text-xl w-full border-b-[1px] border-solid border-[#ccc] py-2">
				THỂ LOẠI
			</h2>
			<ul className="grid grid-cols-2 md:grid-cols-1 gap-2 bg-white py-4 ">
				{categories.map((item) => (
					<Link
						to={`/filter/${item.slug}`}
						key={item.id}
						className="flex items-center text-[14px] text-text-color-gray ml-2 cursor-pointer hover:text-text-color-title transition-all duration-500"
					>
						<IoIosHeartEmpty className="mr-1 " />{" "}
						{uppercaseCapitalize(item.name)}
					</Link>
				))}
			</ul>
		</div>
	);
}
Category.propTypes = {
	categories: PropTypes.array,
};
export default Category;
