import React from "react";
import { AiOutlineMenuFold, AiOutlineLogout } from "react-icons/ai";
import PropTypes from "prop-types";
import logo from "../../../image/icon/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../../api/auth";

function Header(props) {
	const { handleToggleMenu } = props;
	const user = JSON.parse(localStorage.getItem("user"));
	const navigate = useNavigate();
	const onLoggout = () => {
		logout();
		navigate("/");
	};
	return (
		<header className="flex h-[50px] bg-primary-color px-4 items-center">
			<Link to="/" className="basis-1/5 min-w-[300px] sm:min-w-[0]">
				<img className="w-[50px] h-[50px]" src={logo} alt="logo" />
			</Link>
			<div className="basis-4/5 flex justify-between text-text-color-white sm:text-[14px]">
				<div className="flex items-center">
					<AiOutlineMenuFold
						onClick={() => handleToggleMenu()}
						className="mr-1 cursor-pointer hover:text-text-color-title"
					/>
					{user ? <p>Xin chào {user.name}</p> : ""}
				</div>
				<div
					onClick={() => onLoggout()}
					className="flex items-center hover:text-text-color-title cursor-pointer"
				>
					<AiOutlineLogout className="mr-1" />
					<span>Đăng xuất</span>
				</div>
			</div>
		</header>
	);
}
Header.propTypes = {
	handleToggleMenu: PropTypes.func,
};
export default Header;
