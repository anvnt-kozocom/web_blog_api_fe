import React, { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import AdminPage from "..";
import { deleteCategories, fetchCategories } from "../../../api/categoryApi";
import Form from "./Form";
// import PropTypes from "prop-types";

function CategoryPage(props) {
	const [toggleForm, setToggleForm] = useState(false);
	const [defaultCategory, setDefaultCategory] = useState({
		id: null,
		name: "",
		description: null,
		slug: null,
	});

	const categories = useSelector((state) => state.categories.categories);
	const dispatch = useDispatch();
	const onToggleFormCategory = () => {
		setToggleForm(!toggleForm);
	};
	useEffect(() => {
		dispatch(fetchCategories());
	}, [dispatch]);

	const onDeleteCategory = (id, name) => {
		confirmAlert({
			title: `Vui Lòng xác nhận!`,
			message: (
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						marginTop: "4px",
					}}
				>
					Bạn có chắc chắn muốn xoá
					<span style={{ color: "red", marginLeft: "4px" }}>{name}</span> ?
				</div>
			),
			buttons: [
				{
					label: "Có",
					onClick: () => dispatch(deleteCategories(id)),
				},
				{
					label: "Không",
				},
			],
		});
	};
	return (
		<>
			<AdminPage>
				{toggleForm ? (
					<Form
						defaultCategory={defaultCategory}
						onToggleFormCategory={onToggleFormCategory}
					/>
				) : (
					false
				)}
				<section className="py-1 bg-blueGray-50">
					<div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
						<div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
							<div className="rounded-t mb-0 px-4 py-3 border-0">
								<div className="flex flex-wrap items-center">
									<div className="relative w-full px-4 max-w-full flex-grow flex-1">
										<h3 className="font-semibold text-base text-blueGray-700">
											Danh mục
										</h3>
									</div>
									<div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
										<button
											onClick={() => {
												onToggleFormCategory();
												setDefaultCategory({
													id: null,
													name: "",
													description: null,
													slug: null,
												});
											}}
											className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
											type="button"
										>
											Thêm danh mục
										</button>
									</div>
								</div>
							</div>
							<div className="block w-full overflow-x-auto">
								<table className="items-center bg-transparent w-full border-collapse ">
									<thead>
										<tr>
											<th className="text-center px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0  font-semibold">
												#
											</th>
											<th className="text-center px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0  font-semibold max-w-[70px]">
												Tên danh mục
											</th>
											<th className="text-center px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0  font-semibold min-w-[200px]">
												Mô tả
											</th>
											<th className="text-center px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0  font-semibold max-w-[80px]">
												Slug
											</th>
											<th className="text-center px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0  font-semibold max-w-[80px]">
												Hành động
											</th>
										</tr>
									</thead>
									<tbody>
										{categories
											? categories.map((item) => (
													<tr key={item.id} className="text-center">
														<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs  p-4  text-blueGray-700 ">
															{item.id}
														</td>
														<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs  p-4 max-w-[100px]">
															{item.name}
														</td>
														<td className="flex border-t-0 px-4 border-l-0 border-r-0 text-xs py-4 min-w-[200px] justify-center">
															{item.description}
														</td>
														<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs">
															<i className="fas fa-arrow-up text-emerald-500 mr-4" />
															{item.slug}
														</td>
														<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs">
															<span className="flex text-[18px] justify-center">
																<AiOutlineEdit
																	onClick={() => {
																		onToggleFormCategory();
																		setDefaultCategory({
																			id: item.id,
																			name: item.name,
																			description: item.description,
																			slug: item.slug,
																		});
																	}}
																	className="hover:text-[green] text-[#5ae95a] cursor-pointer mr-1"
																/>
																<AiOutlineDelete
																	onClick={() =>
																		onDeleteCategory(item.id, item.name)
																	}
																	className="hover:text-[red] text-[#f65757] cursor-pointer "
																/>
															</span>
														</td>
													</tr>
											  ))
											: false}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</section>
			</AdminPage>
		</>
	);
}

CategoryPage.propTypes = {};
export default CategoryPage;
