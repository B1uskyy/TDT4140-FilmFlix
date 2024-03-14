import React from "react";
import "./App.css"; // eslint-disable-next-line
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import Homepage from "./pages/homepage/Homepage";
import Movies from "./pages/movies/Movies";
import UserSite from "./pages/user/UserSite";
import MovieCard from "./pages/movie_card/MovieCard";
import Register from "./pages/login/Register";
import { UserProvider } from "./helpers/UserContext";

function App() {
	return (
		<div>
			<UserProvider>
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
			</UserProvider>
		</div>
	);
}

export default App;
