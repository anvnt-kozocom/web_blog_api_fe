import React, { useEffect } from "react";
// import PropTypes from "prop-types";
import FilterPage from ".";
import Content from "./Content";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchPostWithFilter } from "../../api/filterApi";
import Loadding from "../../components/Loadding";
import { slugToName, uppercaseCapitalize } from "../../ultits";

FilterWithCategory.propTypes = {};

function FilterWithCategory(props) {
	const posts = useSelector((state) => state.filter.posts);
	const countPage = useSelector((state) => state.filter.pageCount);
	const isLoadding = useSelector((state) => state.filter.loadding);
	const param = useParams();
	const dispatch = useDispatch();
	useEffect(() => {
		window.scrollTo(0, 0);
		const data = {
			slug: param.slug,
			_limit: 20,
		};
		dispatch(fetchPostWithFilter(data));
	}, [param, dispatch]);

	return (
		<FilterPage>
			<h1 className="mt-[100px] pt-[20px] text-text-color-title px-4 my-4 text-[20px] ">
				Trang chủ {">"} {uppercaseCapitalize(slugToName(param.slug))}
			</h1>
			{isLoadding ? (
				<Loadding />
			) : (
				<Content posts={posts} countPage={countPage} />
			)}
		</FilterPage>
	);
}

export default FilterWithCategory;
