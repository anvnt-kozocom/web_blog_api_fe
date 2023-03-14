import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import store from "./store";
import App from "./App";
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	// <React.StrictMode>
	<BrowserRouter>
		<Provider store={store}>
			<App />
			<ToastContainer />
		</Provider>
	</BrowserRouter>
	// </React.StrictMode>
);
