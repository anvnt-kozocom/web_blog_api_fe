import React from "react";
import { Link } from "react-router-dom";
// import PropTypes from "prop-types";

NotFound.propTypes = {};

function NotFound(props) {
	return (
		<div>
			<main className="container mx-auto flex-1 flex flex-col justify-center items-center">
				<h1 className="text-6xl font-bold text-gray-700">404</h1>
				<p className="text-2xl text-gray-600">Page not found.</p>
				<Link
					to="/"
					className="mt-8 bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded"
				>
					Quay về trang chủ
				</Link>
			</main>
		</div>
	);
}

export default NotFound;
