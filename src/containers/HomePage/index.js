import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
// import PropTypes from "prop-types";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Category from "./Category";
import Top from "./Top";
import New from "./New";
import Slide from "./Slide";
import RandomList from "./RandomList";
import List from "./List";
import ShortBlog from "./ShortBlog";
import { fetchData } from "../../api/homeApi";
import Loadding from "../../components/Loadding";

function HomePage(props) {
	const dispatch = useDispatch();
	const categories = useSelector((state) => state.categories.categories);
	const sliderList = useSelector((state) => state.postInHome.posts.slider);
	const topList = useSelector((state) => state.postInHome.posts.top);
	const newList = useSelector((state) => state.postInHome.posts.new);
	const randomList = useSelector((state) => state.postInHome.posts.random);
	const listList = useSelector((state) => state.postInHome.posts.list);
	const shortBlogList = useSelector((state) => state.postInHome.posts.short);
	const isLoadding = useSelector((state) => state.postInHome.isLoadding);

	useEffect(() => {
		dispatch(fetchData());
	}, [dispatch]);

	return (
		<>
			<div className="max-w-[1200px] m-auto">
				<Header />
				<div className="hidden sm:block md:block md:h-[50px] w-full h-[110px] fixed bg-white z-[90] top-[60px]"></div>
				<div className="flex flex-row sm:flex-col-reverse gap-x-3 mt-[60px] md:mt-[120px] sm:mt-[180px]">
					<div className="basis-1/4">
						<Category categories={categories} />
						<Top topList={topList} isLoadding={isLoadding} />
						<New newList={newList} isLoadding={isLoadding} />
					</div>

					<div className="basis-3/4">
						{isLoadding ? (
							<Loadding />
						) : (
							<>
								<Slide sliderList={sliderList} />
								<RandomList randomList={randomList} />
								<List listList={listList} />
								<ShortBlog shortBlogList={shortBlogList} />
							</>
						)}
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
}
// HomePage.propTypes = {};

export default React.memo(HomePage);
