import React from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
// import PropTypes from "prop-types";

function FilterPage(props) {
	return (
		<>
			<div className="hidden sm:block md:block md:h-[50px] w-full h-[110px] fixed bg-white z-[90] top-[60px]"></div>
			<Header />
			<div className="max-w-[1200px] m-auto">
				<div className="mt-[60px] md:mt-[120px] sm:mt-[180px] bg-white my-4 rounded">
					{props.children}
				</div>
			</div>
			<Footer />
		</>
	);
}
FilterPage.propTypes = {};
export default FilterPage;
