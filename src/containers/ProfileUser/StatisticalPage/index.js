import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfileUser from "..";
import { fetchDataStatistical } from "../../../api/statisticalApi";
import RadaChart from "./RadaChart";
// import PropTypes from 'prop-types';

function StatisticalPage(props) {
	const dispatch = useDispatch();
	const statisticalPosts = useSelector((state) => state.statistical.posts);
	const statisticalChapters = useSelector(
		(state) => state.statistical.chapters
	);
	useEffect(() => {
		dispatch(fetchDataStatistical());
	}, [dispatch]);

	return (
		<ProfileUser>
			<RadaChart
				statisticalPosts={statisticalPosts}
				statisticalChapters={statisticalChapters}
			/>
		</ProfileUser>
	);
}
StatisticalPage.propTypes = {};
export default StatisticalPage;
