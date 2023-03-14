import React from "react";
import PropTypes from "prop-types";
import { AiOutlineEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import FadeLoader from "react-spinners/FadeLoader";

function ListPostSame(props) {
	const { postSame, isLoadding } = props;
	const navigate = useNavigate();

	const onViewDetail = (slug) => {
		navigate(`/view/${slug}`);
	};
	const CSSProperties = {
		display: "flex",
		margin: "auto",
		justifyContent: "center",
		alignItems: "center",
	};
	return (
		<div className="bg-white p-4 min-h-[600px]">
			<h2 className="text-text-color-title text-center text-xl w-full border-b-[1px] border-solid border-[#ccc] py-2 ">
				Cùng thể loại
			</h2>
			{isLoadding ? (
				<FadeLoader
					color="#01b22a"
					loading={true}
					cssOverride={CSSProperties}
					size={30}
					aria-label="Loading Spinner"
					data-testid="loader"
				/>
			) : (
				<ul className="bg-white">
					{postSame?.map((item) => (
						<li
							onClick={() => onViewDetail(item.slug)}
							key={item.id}
							className="flex py-2 items-center border-b-[1px] border-dashed border-current text-text-color-gray pl-2 cursor-pointer"
						>
							<img
								className="w-[40px] h-[60px]"
								src={item.image}
								alt={item.name}
							/>
							<div className="ml-2 w-full">
								<h3 className="block hover:text-text-color-title transition-all duration-200">
									{item.name}
								</h3>
								<span className="flex items-center text-xs">
									<AiOutlineEye className="mr-1" /> {item.view}
								</span>
							</div>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
ListPostSame.propTypes = {
	postSame: PropTypes.array,
	isLoadding: PropTypes.bool,
};
export default ListPostSame;
