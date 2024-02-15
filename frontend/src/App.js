import React from "react";
import "./App.css"; // eslint-disable-next-line
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./pages/Login";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/Login" element={<Login />} />
			</Routes>
		</Router>
	);
}

export default App;
