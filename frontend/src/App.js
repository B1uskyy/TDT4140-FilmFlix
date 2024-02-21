import React from "react";
import "./App.css"; // eslint-disable-next-line
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Homepage from "./pages/Homepage";
import Movies from "./pages/Movies";
import UserSite from "./pages/UserSite";
import FilmCard from "./pages/FilmCard";


function App() {
	return (
		<div>
			<Router>
				<Routes>
					<Route path="/Login" exact={true} element={<Login />} />
					<Route path="/Homepage" element={<Homepage />}></Route>
					<Route path="/UserSite" element={<UserSite />}></Route>
					<Route path="/FilmCard" element={<FilmCard />}></Route>
					<Route path="/Movies" element={<Movies />}></Route>
				</Routes>
			</Router>
		</div>
	);
}

export default App;
