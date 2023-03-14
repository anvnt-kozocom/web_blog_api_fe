import React, { useState } from "react";
// import PropTypes from "prop-types";
import { AiOutlineLineChart, AiOutlineQuestionCircle } from "react-icons/ai";
import {
	MdDashboardCustomize,
	MdViewSidebar,
	MdPassword,
} from "react-icons/md";
import { ImProfile } from "react-icons/im";
import { Link } from "react-router-dom";
SideBar.propTypes = {};

function SideBar(props) {
	const [numberActive, setNumberAcctive] = useState(2);

	return (
		<div className="basis-1/5 min-w-[300px] px-6">
			<ul>
				<li className="h-[100px] flex justify-center items-center text-center text-text-color-gray text-base border-b-[1px] mb-4 border-[#ccc] border-solid">
					DashBoard
				</li>
				<li
					onClick={() => setNumberAcctive(1)}
					className={`flex items-center h-[50px] text-text-color-gray cursor-pointer rounded-lg px-4 ${
						numberActive === 1
							? "bg-white shadow-lg text-text-color-title shadow-[#0e647280]"
							: false
					}`}
				>
					<AiOutlineLineChart className="mr-2" />
					<span className="text-[14px]">Thống kê Tổng quan</span>
				</li>
				<Link
					to="/admin/category"
					onClick={() => setNumberAcctive(2)}
					className={`flex items-center h-[50px] text-text-color-gray cursor-pointer rounded-lg px-4 ${
						numberActive === 2
							? "bg-white shadow-lg text-text-color-title shadow-[#0e647280]"
							: false
					}`}
				>
					<MdDashboardCustomize className="mr-2" />
					<span className="text-[14px]">Danh sách</span>
				</Link>
				<li
					onClick={() => setNumberAcctive(3)}
					className={`flex items-center h-[50px] text-text-color-gray cursor-pointer rounded-lg px-4 ${
						numberActive === 3
							? "bg-white shadow-lg text-text-color-title shadow-[#0e647280]"
							: false
					}`}
				>
					<MdViewSidebar className="mr-2" />
					<span className="text-[14px]">Thống kê lượt xem</span>
				</li>
				<li
					onClick={() => setNumberAcctive(4)}
					className={`flex items-center h-[50px] text-text-color-gray cursor-pointer rounded-lg px-4 ${
						numberActive === 4
							? "bg-white shadow-lg text-text-color-title shadow-[#0e647280]"
							: false
					}`}
				>
					<AiOutlineQuestionCircle className="mr-2" />
					<span className="text-[14px]">Câu hỏi thường gặp</span>
				</li>
				<li className="flex items-center h-[50px] text-text-color-gray cursor-pointer rounded-lg px-4">
					<span className="text-[14px]">Account</span>
				</li>
				<li
					onClick={() => setNumberAcctive(5)}
					className={`flex items-center h-[50px] text-text-color-gray cursor-pointer rounded-lg px-4 ${
						numberActive === 5
							? "bg-white shadow-lg text-text-color-title shadow-[#0e647280]"
							: false
					}`}
				>
					<ImProfile className="mr-2" />
					<span className="text-[14px]">Thông tin cá nhân</span>
				</li>
				<li
					onClick={() => setNumberAcctive(6)}
					className={`flex items-center h-[50px] text-text-color-gray cursor-pointer rounded-lg px-4 ${
						numberActive === 6
							? "bg-white shadow-lg text-text-color-title shadow-[#0e647280]"
							: false
					}`}
				>
					<MdPassword className="mr-2" />
					<span className="text-[14px]">Đổi mật khẩu</span>
				</li>
			</ul>
			<div className="flex flex-col items-center my-6">
				<img
					className="rounded-[50%] w-[100px] h-[100px]"
					src="https://img.dtruyen.com/limitless/images/demo/users/face1.jpg"
					alt="ewwe"
				/>
				<div className="flex flex-col items-center">
					<span>Nguyen An</span>
					<span>Anvo8222@gmail.com</span>
				</div>
			</div>
		</div>
	);
}

export default SideBar;
