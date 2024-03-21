import React from "react";
import "./App.css"; // eslint-disable-next-line
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import Homepage from "./pages/homepage/Homepage";
import Movies from "./pages/movies/Movies";
import UserSite from "./pages/user/UserSite";
import MoviePage from "./pages/movie_page/MoviePage";
import Register from "./pages/login/Register";
import { UserProvider } from "./helpers/UserContext";

function App() {
	return (
		<div>
			<UserProvider>
				<Router>
					<Routes>
						<Route path="/" element={<Login />} />
						<Route path="/register" element={<Register />} />
						<Route path="/homepage" element={<Homepage />}></Route>
						<Route path="/user" element={<UserSite />}></Route>
						<Route path="/movies/:id" element={<MoviePage />}></Route>
						<Route path="/movies" element={<Movies />}></Route>
						<Route path="/search/:query" element={<Movies />}></Route>
					</Routes>
				</Router>
			</UserProvider>
		</div>
	);
}

export default App;
