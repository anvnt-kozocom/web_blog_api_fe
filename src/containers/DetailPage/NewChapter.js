import React from "react";
import { AiFillFolderOpen } from "react-icons/ai";
import PropTypes from "prop-types";
import { useNavigate, useParams } from "react-router-dom";
import PacmanLoader from "react-spinners/PacmanLoader";

function NewChapter(props) {
	const { newChapter, isLoadding } = props;
	const param = useParams();
	const navigate = useNavigate();
	const onReadChapter = (slug) => {
		navigate(`/read/${param.slug}/${slug}`);
	};
	const CSSProperties = {
		display: "flex",
		margin: "auto",
		justifyContent: "center",
		alignItems: "center",
	};
	return (
		<div className="my-[20px] bg-white p-4">
			{isLoadding ? (
				<PacmanLoader
					color="#01b22a"
					loading={true}
					cssOverride={CSSProperties}
					size={30}
					aria-label="Loading Spinner"
					data-testid="loader"
				/>
			) : (
				<>
					<h1 className="flex items-center text-text-color-title text-[20px]">
						<AiFillFolderOpen className="mr-1" />
						CHƯƠNG MỚI NHẤT
					</h1>
					<ul>
						{newChapter?.map((item) => (
							<li
								onClick={() => onReadChapter(item.slug_chapter)}
								key={item.id}
								className="hover:bg-[#ccc] cursor-pointer hover:text-text-color-title px-2 py-1 text-text-color-gray text-[16px] border-b border-dashed border-[#ccc]"
							>
								Chương {item.chapter_number} - {item.title}
							</li>
						))}
					</ul>
				</>
			)}
		</div>
	);
}
NewChapter.propTypes = {
	newChapter: PropTypes.array,
	isLoadding: PropTypes.bool,
};
export default NewChapter;
