import React from "react";
import PropTypes from "prop-types";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";

function Slide(props) {
	const { sliderList } = props;
	const navigate = useNavigate();
	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 4,
		slidesToScroll: 4,
		initialSlide: 0,
		autoplay: true,
		autoplaySpeed: 3000,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
					infinite: true,
					dots: true,
				},
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
					initialSlide: 2,
				},
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
				},
			},
		],
	};
	const onViewDetail = (slug) => {
		navigate(`view/${slug}`);
	};
	return (
		<div className="bg-white min-h-[400px] rounded mb-2">
			<h2 className="text-text-color-title pl-2 my-2 text-xl w-full border-b-[1px] border-solid border-[#ccc] py-2">
				ĐỀ CỬ
			</h2>
			<Slider {...settings}>
				{sliderList?.map((item) => (
					<div
						key={item.id}
						className="relative w-[200px] h-[300px] cursor-pointer"
						title={item.name}
						onClick={(e) => onViewDetail(item.slug)}
					>
						<img className="h-full" src={item.image} alt={item.name} />
						<div className="px-2 py-1 absolute bottom-0 bg-gray-900 w-full h-[70px] rounded opacity-80 text-text-color-white">
							<p className="text-center">{item.name}</p>
							<span className="text-center text-[12px] block mt-1">
								{item.is_done === 1 ? "Trọn bộ" : "Chưa hoàn thành"}
							</span>
						</div>
					</div>
				))}
			</Slider>
		</div>
	);
}
Slide.propTypes = {
	sliderList: PropTypes.array,
};
export default Slide;
