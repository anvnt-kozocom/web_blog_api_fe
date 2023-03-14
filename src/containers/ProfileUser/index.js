import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { checkLevelUser } from "../../api/auth";

import Header from "./components/Header";
import SideBar from "./components/SideBar";

// import PropTypes from "prop-types";

function ProfileUser(props) {
	const [isShowMenu, setIsShowMenu] = useState(true);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const handleToggleMenu = () => {
		setIsShowMenu(!isShowMenu);
	};

	const levelUser = useSelector((state) => state.levelUser.levelClient);
	useEffect(() => {
		dispatch(checkLevelUser(navigate));
		if (levelUser !== 1) {
			navigate("/");
		}
	}, [dispatch, levelUser, navigate]);

	return (
		<>
			<Header handleToggleMenu={handleToggleMenu} />
			<div className="flex bg-[#f8f9fa]">
				{isShowMenu ? <SideBar /> : false}
				<div className={`${!isShowMenu ? "px-6 m-auto" : "basis-4/5 px-6"}`}>
					{props.children}
				</div>
			</div>
		</>
	);
}
ProfileUser.propTypes = {};

export default ProfileUser;
