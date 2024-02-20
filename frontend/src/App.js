import React from "react";
import "./App.css"; // eslint-disable-next-line
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./pages/Login";

function App() {
	return (
		<div>
			<Router>
				<Routes>
					<Route path="/Login" exact={true} element={<Login />} />
					<Route path="/Homepage" />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
