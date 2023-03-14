import React from "react";
// import PropTypes from "prop-types";

Footer.propTypes = {};

function Footer(props) {
	return (
		<footer className="bg-gray-900 text-white py-8">
			<div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
				<div className="text-center md:text-left">
					<p>Address: VietNam</p>
					<p>Phone: 0387967435</p>
					<p>Email: anvo822@gmail.com</p>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
