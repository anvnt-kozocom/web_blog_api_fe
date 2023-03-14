import React, { useEffect } from "react";
import { FaUserAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import RingLoader from "react-spinners/RingLoader";
import { fetchChapterContent, fetchComments } from "../../api/readApi";
import Comment from "../../components/Comment";
// import PropTypes from "prop-types";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { formatTimeDate } from "../../ultits/dateTime";

ReadPage.propTypes = {};

function ReadPage(props) {
	const detailPost = useSelector((state) => state.detailOfPost.chapterContent);
	const listComment = useSelector((state) => state.detailOfPost.listComment);
	const isLoadding = useSelector(
		(state) => state.detailOfPost.isLoaddingChapter
	);

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const param = useParams();
	useEffect(() => {
		dispatch(fetchChapterContent(param.slugChapter, navigate));
		if (listComment.length === 0) {
			dispatch(fetchComments(param.slugPost));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [param]);
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	const CSSProperties = {
		display: "flex",
		margin: "auto",
		justifyContent: "center",
		alignItems: "center",
		height: "20vh",
		backgroundColor: "#fff",
	};
	const handleChangeChapter = (e) => {
		navigate(`/read/${param.slugPost}/${e.target.value}`);
	};
	return (
		<>
			<Header />
			<div className="hidden sm:block md:block md:h-[50px] w-full h-[110px] fixed bg-white z-[90] top-[60px]"></div>

			<div
				className={`max-w-[1200px] m-auto ${
					isLoadding
						? "flex flex-col min-h-[100vh] bg-white justify-center md:mt-[100px] sm:mt-[150px]"
						: ""
				}`}
			>
				{isLoadding ? (
					<RingLoader
						color="#01b22a"
						loading={true}
						cssOverride={CSSProperties}
						size={150}
						aria-label="Loading Spinner"
						data-testid="loader"
					/>
				) : (
					<>
						<div className="mt-[60px] md:mt-[120px] sm:mt-[180px]">
							<div className="mt-[20px] bg-white p-4">
								<div className="border-[4px] border-dashed border-[#ccc] m-6 p-6">
									<h1 className="text-text-color-title text-center text-[20px] font-bold">
										{detailPost?.posts?.name?.toUpperCase()}
									</h1>
									<h3 className="text-text-color-gray text-center text-[18px] font-bold">
										Chương {detailPost?.chapter_number}:{" "}
										{detailPost?.title?.toUpperCase()}
									</h3>
									<span className="flex items-center justify-center my-1 text-text-color-gray">
										<FaUserAlt className="mr-1" />{" "}
										{detailPost?.posts?.users?.name}
									</span>
									<span className="flex items-center justify-center my-1 text-text-color-gray">
										{formatTimeDate(detailPost?.created_at)}
									</span>
								</div>
							</div>
						</div>
						<div
							style={{ fontFamily: "Times New Roman" }}
							className="my-2 bg-white p-4 text-[24px]"
						>
							<div
								dangerouslySetInnerHTML={{ __html: detailPost?.content }}
							></div>
							<div className="flex justify-center my-8">
								{/* <span className="text-text-color-white bg-[#29f029] hover:bg-[green] cursor-pointer w-[100px] text-center rounded-md">
								Trước
							</span> */}
								<select
									onChange={(e) => handleChangeChapter(e)}
									className="text-[16px] bg-[#7df37d] py-1 px-2 rounded-2xl"
									name="slug"
									id="plan"
								>
									{detailPost?.posts?.chapters?.map((item) => (
										<option
											key={item.id}
											value={item.slug_chapter}
											selected={param.slugChapter === item.slug_chapter}
										>
											Chương {item.chapter_number}
										</option>
									))}
								</select>
								{/* <span className="text-text-color-white bg-[#29f029] hover:bg-[green] cursor-pointer w-[100px] text-center rounded-md">
								Sau
							</span> */}
							</div>
						</div>
					</>
				)}

				<Comment listComment={listComment} idPost={detailPost?.post_id} />
			</div>

			<Footer />
		</>
	);
}

export default ReadPage;
