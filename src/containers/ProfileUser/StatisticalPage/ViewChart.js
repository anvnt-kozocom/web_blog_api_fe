import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Bar } from "react-chartjs-2";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";

function ViewChart(props) {
	const { statisticalView } = props;
	const [height, setHeight] = useState(0);
	const [posts, setPosts] = useState([]);

	ChartJS.register(
		CategoryScale,
		LinearScale,
		BarElement,
		Title,
		Tooltip,
		Legend
	);
	useEffect(() => {
		setHeight(statisticalView ? statisticalView.length * 40 : 300);
		setPosts([...statisticalView].sort((a, b) => b.view - a.view));
	}, [statisticalView]);
	const options = {
		indexAxis: "y",
		elements: {
			bar: {
				borderWidth: 2,
			},
		},
		responsive: true,
		plugins: {
			legend: {
				position: "right",
			},
			title: {
				display: true,
				text: "Chart.js Horizontal Bar Chart",
			},
		},
		maintainAspectRatio: false,
		height: height,
	};
	const data = {
		labels: posts?.map((item) => item.name),
		datasets: [
			{
				label: "Lượt xem",
				data: posts?.map((item) => item.view),
				borderColor: "rgb(255, 99, 132)",
				backgroundColor: "rgba(255, 99, 132, 0.5)",
			},
		],
	};
	return (
		<div
			style={{ height: `${height}px` }}
			className={`w-[600px] overflow-y-auto md:w-[470px] md:h-[470px] sm:w-[300px] sm:h-[300px] flex items-center justify-center`}
		>
			<Bar data={data} options={options} />
		</div>
	);
}
ViewChart.propTypes = {
	statisticalView: PropTypes.array,
};
export default ViewChart;
