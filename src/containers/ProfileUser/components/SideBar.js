/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
// import PropTypes from "prop-types";
import { AiOutlineLineChart, AiOutlineQuestionCircle } from "react-icons/ai";
import {
	MdDashboardCustomize,
	MdViewSidebar,
	MdPassword,
} from "react-icons/md";
import { ImProfile } from "react-icons/im";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfileUser } from "../../../api/auth";
import { uppercaseCapitalize } from "../../../ultits";
import avatar from "../../../image/avatar/blogOnlineAvatar.jpg";

SideBar.propTypes = {};

function SideBar(props) {
	const user = useSelector((state) => state.profileUser.user);

	const location = useLocation();
	const dispatch = useDispatch();
	const getUrl = location.pathname.split("/");
	useEffect(() => {
		dispatch(fetchProfileUser());
	}, []);
	return (
		<div className="basis-1/5 min-w-[300px] px-6">
			<ul>
				<li className="h-[100px] flex justify-center items-center text-center text-text-color-gray text-base border-b-[1px] mb-4 border-[#ccc] border-solid">
					Cảm ơn bạn đã ghé thăm web đọc truyện của chúng tôi!
				</li>
				<Link
					to="/profile/statis"
					className={`flex items-center h-[50px] text-text-color-gray cursor-pointer rounded-lg px-4 ${
						getUrl.includes("statis")
							? "bg-white shadow-lg text-text-color-title shadow-[#0e647280]"
							: false
					}`}
				>
					<AiOutlineLineChart className="mr-2" />
					<span className="text-[14px]">Thống kê Tổng quan</span>
				</Link>
				<Link
					to="/profile/list"
					className={`flex items-center h-[50px] text-text-color-gray cursor-pointer rounded-lg px-4 ${
						getUrl.includes("list")
							? "bg-white shadow-lg text-text-color-title shadow-[#0e647280]"
							: false
					}`}
				>
					<MdDashboardCustomize className="mr-2" />
					<span className="text-[14px]">Danh sách</span>
				</Link>
				<Link
					to="/profile/statis-view"
					className={`flex items-center h-[50px] text-text-color-gray cursor-pointer rounded-lg px-4 ${
						getUrl.includes("statis-view")
							? "bg-white shadow-lg text-text-color-title shadow-[#0e647280]"
							: false
					}`}
				>
					<MdViewSidebar className="mr-2" />
					<span className="text-[14px]">Thống kê lượt xem</span>
				</Link>
				<li
					className={`flex items-center h-[50px] cursor-not-allowed text-text-color-gray rounded-lg px-4 ${
						getUrl.includes("4")
							? "bg-white shadow-lg text-text-color-title shadow-[#0e647280]"
							: false
					}`}
				>
					<AiOutlineQuestionCircle className="mr-2" />
					<span className="text-[14px]">Câu hỏi thường gặp</span>
				</li>
				<li className="flex items-center h-[50px] text-text-color-gray cursor-not-allowed rounded-lg px-4">
					<span className="text-[14px]">Account</span>
				</li>
				<Link
					to="/profile/view"
					className={`flex items-center h-[50px] text-text-color-gray cursor-pointer rounded-lg px-4 ${
						getUrl.includes("view")
							? "bg-white shadow-lg text-text-color-title shadow-[#0e647280]"
							: false
					}`}
				>
					<ImProfile className="mr-2" />
					<span className="text-[14px]">Thông tin cá nhân</span>
				</Link>
				<Link
					to="/profile/change-password"
					className={`flex items-center h-[50px] text-text-color-gray cursor-pointer rounded-lg px-4 ${
						getUrl.includes("change-password")
							? "bg-white shadow-lg text-text-color-title shadow-[#0e647280]"
							: false
					}`}
				>
					<MdPassword className="mr-2" />
					<span className="text-[14px]">Đổi mật khẩu</span>
				</Link>
			</ul>
			<div className="flex flex-col items-center my-6">
				<img
					className="rounded-[50%] w-[100px] h-[100px]"
					src={avatar}
					alt="ewwe"
				/>
				<div className="flex flex-col items-center">
					<span>
						{user?.name ? uppercaseCapitalize(user?.name) : user?.name}
					</span>
					<span>{user?.email}</span>
				</div>
			</div>
		</div>
	);
}

export default SideBar;
