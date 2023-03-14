import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Radar } from "react-chartjs-2";
import {
	Chart as ChartJS,
	RadialLinearScale,
	PointElement,
	LineElement,
	Filler,
	Tooltip,
	Legend,
} from "chart.js";
RadaChart.propTypes = {
	statisticalPosts: PropTypes.array,
	statisticalChapters: PropTypes.array,
};

function RadaChart(props) {
	const { statisticalPosts, statisticalChapters } = props;
	const [months, setMonths] = useState([]);
	const [dataPosts, setDataPosts] = useState([]);
	const [dataChapter, setDataChapter] = useState([]);
	useEffect(() => {
		let newMonths = [];
		for (let i = 1; i <= 12; i++) {
			newMonths.push(`Tháng ${i}`);
		}
		setMonths(newMonths);
		if (statisticalPosts.length > 0) {
			const newDataPosts = Array.from({ length: 12 }, () => 0);
			statisticalPosts.forEach(function (item) {
				newDataPosts[item.month - 1] = item.post_count;
			});
			setDataPosts(newDataPosts);
		}

		if (statisticalChapters.length > 0) {
			const newDataChapters = Array.from({ length: 12 }, () => 0);
			statisticalChapters.forEach(function (item) {
				newDataChapters[item.month - 1] = item.chapter_count;
			});
			setDataChapter(newDataChapters);
		}
	}, [statisticalPosts, statisticalChapters]);

	ChartJS.register(
		RadialLinearScale,
		PointElement,
		LineElement,
		Filler,
		Tooltip,
		Legend
	);

	const data = {
		labels: months,
		datasets: [
			{
				label: "# Số bài viết trong tháng",
				data: dataPosts,
				backgroundColor: "rgba(255, 99, 132, 0.2)",
				borderColor: "rgba(255, 99, 132, 1)",
				borderWidth: 1,
			},
			{
				label: "# Số chương trong tháng",
				data: dataChapter,
				backgroundColor: "rgba(75, 192, 192, 0.2)",
				borderColor: "rgba(75, 192, 192, 1)",
				borderWidth: 1,
			},
		],
	};
	return (
		<div className="w-[600px] h-[600px] md:w-[470px] md:h-[470px] sm:w-[300px] sm:h-[300px] flex items-center justify-center">
			<Radar data={data} />
		</div>
	);
}

export default RadaChart;
