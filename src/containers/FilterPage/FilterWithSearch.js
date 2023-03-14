import React from "react";
// import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import Loadding from "../../components/Loadding";
import FilterPage from ".";
import Content from "./Content";

FilterWithSearch.propTypes = {};

function FilterWithSearch(props) {
	const posts = useSelector((state) => state.filter.posts);
	const countPage = useSelector((state) => state.filter.pageCount);
	const isLoadding = useSelector((state) => state.filter.loadding);
	return (
		<FilterPage>
			<h1 className="mt-[100px] pt-[20px] text-text-color-title px-4 my-4 text-[20px] ">
				{/* Trang chủ {">"} {uppercaseCapitalize(slugToName(param.slug))} */}
				Tìm kiếm
			</h1>
			{isLoadding ? (
				<Loadding />
			) : (
				<Content posts={posts} countPage={countPage} />
			)}
		</FilterPage>
	);
}

export default FilterWithSearch;
