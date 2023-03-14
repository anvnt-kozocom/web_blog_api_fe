import React, { useEffect, useState } from "react";
import { FaUserAlt } from "react-icons/fa";

// import PropTypes from "prop-types";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { BiCategoryAlt } from "react-icons/bi";
import { AiFillStar, AiOutlineEye } from "react-icons/ai";
import { GrStatusCritical } from "react-icons/gr";
import { FcOvertime } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchData, fetchListChapter, updateView } from "../../api/readApi";
import { formatTimeDate } from "../../ultits/dateTime";
import NewChapter from "./NewChapter";
import ListChapter from "./ListChapter";
import ListPostSame from "./ListPostSame";
import Comment from "../../components/Comment";
import { formatNumber } from "../../ultits/formatNumber";
import PacmanLoader from "react-spinners/PacmanLoader";
import { setLoadding } from "../../slice/detail";

DetailPage.propTypes = {};

function DetailPage(props) {
	const [isShowMore, setIsShowMore] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const param = useParams();
	const detailPost = useSelector((state) => state.detailOfPost.detail);
	const newChapter = useSelector((state) => state.detailOfPost.newChaptter);
	const postSame = useSelector((state) => state.detailOfPost.listPostSame);
	const isLoadding = useSelector((state) => state.detailOfPost.isLoadding);
	const countPageChapter = useSelector(
		(state) => state.detailOfPost.listChapter.last_page
	);
	const listChapter = useSelector(
		(state) => state.detailOfPost.listChapter.data
	);
	const listComment = useSelector((state) => state.detailOfPost.listComment);
	const CSSProperties = {
		display: "flex",
		margin: "auto",
		justifyContent: "center",
		alignItems: "center",
	};
	const onTogleShowMore = () => {
		setIsShowMore(!isShowMore);
	};
	useEffect(() => {
		window.scrollTo(0, 0);
		dispatch(fetchData(param.slug, navigate));
		dispatch(fetchListChapter(param.slug));
		dispatch(setLoadding(true));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch, param]);
	const onReadPost = (slug) => {
		dispatch(updateView(slug));
		navigate(
			`/read/${detailPost?.slug}/${detailPost?.chapters[0].slug_chapter}`
		);
	};
	return (
		<>
			<Header />
			<div className="max-w-[1200px] m-auto">
				<div className="hidden sm:block md:block md:h-[50px] w-full h-[110px] fixed bg-white z-[90] top-[60px]"></div>
				<div className="flex flex-row sm:flex-col md:flex-col gap-x-3 mt-[60px] md:mt-[120px] sm:mt-[180px]">
					<div className="basis-3/4 ">
						<div
							className={`bg-white p-4 flex flex-row ${
								isLoadding ? "" : "md:block sm:block"
							}  min-h-[400px]`}
						>
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
									<div className="basis-1/4 text-text-color-gray text-[14px] md:flex sm:flex">
										<img
											className="h-[300px] w-[210px]"
											src={detailPost?.image}
											alt={detailPost?.name}
										/>
										<div className="md:ml-2 sm:ml-2 ">
											<span className="flex items-center mt-2">
												<FaUserAlt className="mr-2" />
												{detailPost?.author}
											</span>
											<span className="flex items-center mt-2">
												<BiCategoryAlt className="mr-2" />
												{detailPost?.categories?.map((item, index) =>
													detailPost?.categories?.length - 1 > index
														? item.name + ","
														: item.name
												)}
											</span>
											<span className="flex items-center mt-2">
												<GrStatusCritical className="mr-2" />
												{detailPost?.is_done === 0
													? "Đang cập nhật"
													: "Hoàn thành"}
											</span>
											<span className="flex items-center mt-2">
												<AiOutlineEye className="mr-2" />
												{detailPost?.view ? formatNumber(detailPost?.view) : 0}
											</span>
											<span className="flex items-center mt-2">
												<FcOvertime className="mr-2" />
												{formatTimeDate(detailPost?.created_at)}
											</span>
										</div>
									</div>
									<div className="basis-3/4">
										<h1 className="text-text-color-title text-center text-[20px] md:mt-2 sm:mt-2">
											{detailPost?.name?.toUpperCase()}
										</h1>
										<div className="flex justify-center my-2">
											<AiFillStar className="text-[30px] text-[yellow] " />
											<AiFillStar className="text-[30px] text-[yellow] " />
											<AiFillStar className="text-[30px] text-[yellow] " />
											<AiFillStar className="text-[30px] text-[yellow] " />
											<AiFillStar className="text-[30px] text-[yellow] " />
											<AiFillStar className="text-[30px] text-[yellow] " />
										</div>
										<button
											onClick={() => onReadPost(detailPost?.slug)}
											className="block m-auto bg-[#3dea3d] hover:bg-[green]  text-text-color-white rounded h-[30px] w-[80px]"
										>
											Đọc
										</button>

										<p
											className={`text-text-color-gray text-[16px] mt-4 text-justify px-2 border-t pt-2 ${
												isShowMore ? "" : "max-h-[300px]"
											} ${isShowMore ? "" : "overflow-hidden"} `}
										>
											{detailPost?.description
												? detailPost?.description
												: "Chưa có thông tin"}
										</p>
										<span
											onClick={() => onTogleShowMore()}
											className="flex justify-center cursor-pointer text-text-color-title text-[14px]"
										>
											{isShowMore ? "Rút gọn" : "Xem thêm"}
										</span>
									</div>
								</>
							)}
						</div>
						{/* new chapter (5) */}
						<NewChapter newChapter={newChapter} isLoadding={isLoadding} />
						{/* list chapter */}
						<ListChapter
							listChapter={listChapter}
							countPageChapter={countPageChapter}
							param={param}
						/>
						<Comment listComment={listComment} idPost={detailPost?.id} />
					</div>
					<div className="basis-1/4 ">
						<ListPostSame postSame={postSame} isLoadding={isLoadding} />
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
}

export default DetailPage;
