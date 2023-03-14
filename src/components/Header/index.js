/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
	AiOutlineCloudUpload,
	AiOutlineUser,
	AiOutlineLogout,
} from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import { BsBookmarkHeart } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { isLogged, logout } from "../../api/auth";
import { fetchCategories } from "../../api/categoryApi";
import { fetchPostWithFilter } from "../../api/filterApi";
// import PropTypes from "prop-types";

import logo from "../../image/icon/logo.png";
import { setValueSearch } from "../../slice/filter";
import { uppercaseFirstString } from "../../ultits";
import useDebounce from "../../ultits/debounce";

function Header(props) {
	const [user, setSser] = useState(JSON.parse(localStorage.getItem("user")));
	const [query, setQuery] = useState("");
	const [navigateToSearch, setNavigateToSearch] = useState(false);
	const categories = useSelector((state) => state.categories.categories);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const debounce = useDebounce(query, 1000);
	useEffect(() => {
		dispatch(fetchCategories());
	}, [dispatch]);
	const onLogout = () => {
		logout();
		setSser(null);
	};
	useEffect(() => {}, [user]);
	const onRedirecToHome = () => {
		navigate("/");
	};
	const onUpStory = () => {
		if (isLogged()) {
			navigate("/profile/list");
		} else {
			navigate("/login");
		}
	};
	useEffect(() => {
		if (navigateToSearch) {
			navigate("/filter/search");
		}
	}, [navigateToSearch]);

	useEffect(() => {
		if (debounce !== "") {
			setNavigateToSearch(true);
			const data = {
				q: debounce,
				_limit: 20,
			};
			dispatch(fetchPostWithFilter(data));
			dispatch(setValueSearch(debounce));
		}
	}, [debounce]);

	const handleChange = (e) => {
		const inputValue = e.target.value;
		setQuery(inputValue);
		setNavigateToSearch(false);
	};

	return (
		<>
			<header className="fixed z-[100] top-0 left-0 right-0 h-[60px] bg-primary-color flex text-text-color-white justify-between px-[20px] sm:block sm:p-0 md:flex-wrap">
				<div className="flex sm:justify-center">
					<img
						onClick={() => onRedirecToHome()}
						className="w-[100px] h-[60px] cursor-pointer"
						src={logo}
						alt="logo"
					/>
					<ul className="flex sm:flex-wrap">
						<li className="group hover:bg-sky-700 cursor-pointer leading-[60px] mx-4 flex items-center px-2 relative sm:mx-0">
							<BiCategory className="text-text-color-white mr-1 text-lg" />
							Thể loại
							<ul className="shadow-lg shadow-[#a3a3a3] hidden group-hover:block absolute bg-white top-[100%] rounded">
								{categories.slice(0, 10).map((item) => (
									<Link
										to={`/filter/${item.slug}`}
										key={item.id}
										className="hover:text-text-color-title decoration-1 w-[250px] text-[14px] hover:bg-gray-200 border-t-[1px] border-slate-400 border-solid h-[46px] text-text-color-gray flex items-center px-2 transition-all duration-300"
									>
										<BsBookmarkHeart className="mx-2 text-pink-400" />
										{uppercaseFirstString(item.name)}
									</Link>
								))}
							</ul>
						</li>
						<li
							onClick={() => onUpStory()}
							className="hover:bg-sky-700 cursor-pointer leading-[60px] mx-4 flex items-center px-2 bg-background-color-active sm:mx-0"
						>
							<AiOutlineCloudUpload className="text-text-color-white mr-1 text-lg" />
							Đăng truyện
						</li>
					</ul>
				</div>

				<div className="flex md:float-right sm:float-right ">
					<div className="flex items-center mx-2">
						<input
							type="text"
							onChange={(e) => handleChange(e)}
							className="h-[40px] text-text-color-gray p-4 rounded-[4px] border-b border-[#ccc]"
							placeholder="Tìm truyện"
						/>
					</div>
					<div className="flex w-[200px] sm:w-[auto] items-center mx-2 md:mx-0 relative group cursor-pointer justify-end">
						<img
							src={
								user
									? user.avatar
										? user.avatar
										: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTPzBF74hA1avhZGbDvPRJK-cAaN7KL9I8ew&usqp=CAU"
									: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTPzBF74hA1avhZGbDvPRJK-cAaN7KL9I8ew&usqp=CAU"
							}
							alt="ejwek"
							className="rounded-[50%] w-[40px] h-[40px] mr-1 md:mr-0"
						/>
						<span className="md:text-text-color-gray sm:text-text-color-gray">
							{user ? user.name : "Người dùng"}
						</span>

						{user ? (
							<div className="hidden group-hover:block absolute bg-[white] top-[100%] w-[180px] right-2 rounded-md text-[14px] text-text-color-gray shadow-lg shadow-[#a1a1a1] border-[#88a7ea] border-[1px]">
								<Link
									to="/profile/statis"
									className="flex items-center h-[30px] hover:bg-[#c8c8c8] w-full"
								>
									<AiOutlineUser className="mr-2 ml-1" />{" "}
									<span>Trang cá nhân</span>
								</Link>
								<button className="flex items-center h-[30px] hover:bg-[#c8c8c8] w-full">
									<AiOutlineCloudUpload className="mr-2 ml-1" />{" "}
									<span>Đăng truyện</span>
								</button>
								<button
									onClick={() => {
										onLogout();
									}}
									className="flex items-center h-[30px] hover:bg-[#c8c8c8] w-full text-[red]"
								>
									<AiOutlineLogout className="mr-2 ml-1" />{" "}
									<span>Đăng xuất</span>
								</button>
							</div>
						) : (
							<div className="hidden group-hover:block absolute bg-[white] top-[100%] w-[180px] right-2 rounded-md text-[14px] text-text-color-gray shadow-lg shadow-[#a1a1a1] border-[#88a7ea] border-[1px]">
								<Link
									to="/login"
									className="flex items-center h-[30px] hover:bg-[#c8c8c8] w-full"
								>
									<AiOutlineUser className="mr-2 ml-1" />
									<span>Đăng nhập</span>
								</Link>
							</div>
						)}
					</div>
				</div>
			</header>
		</>
	);
}

Header.propTypes = {};
export default Header;
