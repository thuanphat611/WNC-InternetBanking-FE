import ReactDOM from "react-dom";
import React from "react";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import AppConnect from "./BankingUI/App/AppConnect";
import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
// require("dotenv").config();

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<AppConnect />
		</BrowserRouter>
	</Provider>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
