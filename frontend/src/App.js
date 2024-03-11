import React, { useState } from "react";
import "./App.css"; // eslint-disable-next-line
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import Homepage from "./pages/homepage/Homepage";
import Movies from "./pages/movies/Movies";
import UserSite from "./pages/user/UserSite";
import MovieCard from "./pages/movie_card/MovieCard";
import Register from "./pages/login/Register";
import UserContext from "./helpers/UserContext";

function App() {
	const [user, setUser] = useState({ username: "" });

	return (
		<div>
			<UserContext.Provider value={{ user, setUser }}>
				<Router>
					<Routes>
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
						<Route path="/" element={<Homepage />}></Route>
						<Route path="/user" element={<UserSite />}></Route>
						<Route path="/movies/:id" element={<MovieCard />}></Route>
						<Route path="/movies" element={<Movies />}></Route>
						<Route path="/search/:query" element={<Movies />}></Route>
					</Routes>
				</Router>
			</UserContext.Provider>
		</div>
	);
}

export default App;
