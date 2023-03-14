import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { checkLevelUser } from "../../api/auth";

// import PropTypes from "prop-types";
// import { Link } from "react-router-dom";

import Header from "./components/Header";
import SideBar from "./components/SideBar";

AdminPage.propTypes = {};

function AdminPage(props) {
	const levelUser = useSelector((state) => state.levelUser.level);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(checkLevelUser());
		if (levelUser !== 0) {
			navigate("/");
		}
	}, [dispatch, levelUser, navigate]);

	const [isShowMenu, setIsShowMenu] = useState(true);

	const handleToggleMenu = () => {
		setIsShowMenu(!isShowMenu);
	};

	return (
		<>
			<Header handleToggleMenu={handleToggleMenu} />
			<div className="flex">
				{isShowMenu ? <SideBar /> : false}
				<div
					className={`${!isShowMenu ? "px-6 m-auto w-full" : "basis-4/5 px-6"}`}
				>
					{props.children}
				</div>
			</div>
		</>
	);
}

export default AdminPage;
