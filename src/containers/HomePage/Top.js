import React from "react";
import PropTypes from "prop-types";
import { AiOutlineEye } from "react-icons/ai";
import FadeLoader from "react-spinners/FadeLoader";
import { useNavigate } from "react-router-dom";

function Top(props) {
	const { topList, isLoadding } = props;
	const navigate = useNavigate();
	const CSSProperties = {
		display: "block",
		margin: "auto",
	};
	const onViewDetail = (slug) => {
		navigate(`view/${slug}`);
	};
	return (
		<div className="bg-white min-h-[400px] rounded mb-2">
			<h2 className="text-text-color-title text-center text-xl w-full border-b-[1px] border-solid border-[#ccc] py-2">
				TOP
			</h2>
			<ul className="bg-white">
				{isLoadding ? (
					<FadeLoader
						color="#01b22a"
						loading={true}
						cssOverride={CSSProperties}
						size={150}
						aria-label="Loading Spinner"
						data-testid="loader"
					/>
				) : (
					<>
						{topList?.map((item) => (
							<li
								key={item.id}
								onClick={() => onViewDetail(item.slug)}
								className="py-2 items-center border-b-[1px] border-dashed border-current text-text-color-gray pl-2 cursor-pointer "
							>
								<h3 className="block hover:text-text-color-title transition-all duration-200">
									{item.name}
								</h3>
								<span className="flex items-center text-xs">
									<AiOutlineEye className="mr-1" /> {item.view}
								</span>
							</li>
						))}
					</>
				)}
			</ul>
		</div>
	);
}
Top.propTypes = {
	topList: PropTypes.array,
	isLoadding: PropTypes.bool,
};
export default Top;
