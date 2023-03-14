import React, { useEffect } from "react";
// import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import ProfileUser from "..";
import { fetchDataStatisticalView } from "../../../api/statisticalApi";
import ViewChart from "./ViewChart";

function View(props) {
	const dispatch = useDispatch();
	const statisticalView = useSelector((state) => state.statistical.postsView);
	useEffect(() => {
		dispatch(fetchDataStatisticalView());
	}, [dispatch]);
	return (
		<ProfileUser>
			<ViewChart statisticalView={statisticalView} />
		</ProfileUser>
	);
}
View.propTypes = {};

export default View;
