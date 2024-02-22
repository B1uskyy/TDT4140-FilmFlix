import React from "react";
import "./App.css"; // eslint-disable-next-line
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Homepage from "./pages/Homepage";
import Movies from "./pages/Movies";
import UserSite from "./pages/UserSite";
import MovieCard from "./pages/MovieCard";


function App() {

	return (
		<div>
			<Router>
				<Routes>
					<Route path="/login" exact={true} element={<Login />} />
					<Route path="/homepage" element={<Homepage />}></Route>
					<Route path="/usersite" element={<UserSite />}></Route>
					<Route path="/moviecard/:id" element={<MovieCard />}></Route>
					<Route path="/movies" element={<Movies />}></Route>
				</Routes>
			</Router>
		</div>
	);
}

export default App;
