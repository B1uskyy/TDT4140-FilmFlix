import React from "react";
import "./App.css"; // eslint-disable-next-line
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import Homepage from "./pages/homepage/Homepage";
import Movies from "./pages/movies/Movies";
import UserSite from "./pages/user/UserSite";
import MovieCard from "./pages/movie_card/MovieCard";


function App() {

	return (
		<div>
			<Router>
				<Routes>
					<Route path="/login" exact={true} element={<Login />} />
					<Route path="/" element={<Homepage />}></Route>
					<Route path="/user" element={<UserSite />}></Route>
					<Route path="/movies/:id" element={<MovieCard />}></Route>
					<Route path="/movies" element={<Movies />}></Route>
				</Routes>
			</Router>
		</div>
	);
}

export default App;
