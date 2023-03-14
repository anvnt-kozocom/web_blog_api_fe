import HomePage from "./containers/HomePage";
import "./index.css";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./containers/auth/LoginPage";
import RegisterPage from "./containers/auth/RegisterPage";
import Active from "./containers/auth/RegisterPage/Active";
import ForgotPasswordPage from "./containers/auth/ForgotPasswordPage";
import ChangePassword from "./containers/auth/ForgotPasswordPage/ChangePassword";
import ProfileUser from "./containers/ProfileUser";
import ListStoryPage from "./containers/ProfileUser/ListStoryPage";
import AdminPage from "./containers/AdminPage";
import CategoryPage from "./containers/AdminPage/CategoryPage";
import LoginAdmin from "./containers/AdminPage/AuthAdmin/LoginAdmin";
import { isLogged } from "./api/auth";
import NotFound from "./components/NotFound";
import AddStory from "./containers/ProfileUser/ListStoryPage/AddStory";
import ListChapterPage from "./containers/ProfileUser/ListChapterPage";
import AddChapter from "./containers/ProfileUser/ListChapterPage/AddChapter";
import DetailPage from "./containers/DetailPage";
import ReadPage from "./containers/ReadPage";
import ProfilePage from "./containers/ProfileUser/ProfilePage";
import ChangePassPage from "./containers/ProfileUser/ChangePassPage";
import FilterWithCategory from "./containers/FilterPage/FilterWithCategory";
import FilterWithSearch from "./containers/FilterPage/FilterWithSearch";
import StatisticalPage from "./containers/ProfileUser/StatisticalPage";
import View from "./containers/ProfileUser/StatisticalPage/View";

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/view/:slug" element={<DetailPage />} />
				<Route path="/read/:slugPost/:slugChapter" element={<ReadPage />} />
				<Route path="/filter/:slug" element={<FilterWithCategory />} />
				<Route path="/filter/search" element={<FilterWithSearch />} />

				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<RegisterPage />} />
				<Route path="/active/:id/:token" element={<Active />} />
				<Route path="/forgot-password" element={<ForgotPasswordPage />} />
				<Route
					path="/change-password/:id/:token"
					element={<ChangePassword />}
				/>
				{isLogged() ? (
					<Route path="/profile">
						<Route index element={<ProfileUser />} />
						<Route path="statis" element={<StatisticalPage />} />
						<Route path="statis-view" element={<View />} />
						<Route path="list" element={<ListStoryPage />} />
						<Route path="add/story" element={<AddStory />} />
						<Route path="update/story" element={<AddStory />} />
						{/* list chapter */}
						<Route path="list-chapter/:id" element={<ListChapterPage />} />
						{/* id: id of post */}
						<Route path="add-chapter/:id" element={<AddChapter />} />
						{/* id: id of chapter */}
						<Route path="update-chapter/:id" element={<AddChapter />} />

						<Route path="view" element={<ProfilePage />} />
						<Route path="change-password" element={<ChangePassPage />} />
					</Route>
				) : (
					false
				)}

				<Route path="*" element={<NotFound />} />

				{/* admin page */}
				<Route path="/admin/login/212000" element={<LoginAdmin />} />
				{isLogged() ? (
					<Route path="/admin">
						<Route index element={<AdminPage />} />
						<Route path="category" element={<CategoryPage />} />
					</Route>
				) : (
					false
				)}
			</Routes>
		</>
	);
}

export default App;
