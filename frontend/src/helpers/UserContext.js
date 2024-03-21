// In UserContext.js
import React, {createContext, useState, useContext, useEffect} from "react";
import {useCookies} from "react-cookie";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const [cookies, setCookie, removeCookie] = useCookies(["username"]);

	const [user, setUser] = useState(cookies.username || null);
	const [markedMovies, setMarkedMovies] = useState([]);

	useEffect(() => {
		if (user) {
			setCookie("username", user, { path: "/" });
		} else {
			removeCookie("username");
		}
	}, [user]);

	// set the cookie together with user


	const markMovie = (movieId) => {
		if (!markedMovies.includes(movieId)) {
            setMarkedMovies([...markedMovies, movieId]); // Add movie to markedMovies array
        }
	};

	const unmarkMovie = (movieId) => {
        setMarkedMovies(markedMovies.filter(id => id !== movieId)); // Remove movie from markedMovies array
    };

	return (
		<UserContext.Provider value={{ user, setUser, markedMovies, markMovie, unmarkMovie }}>
			{children}
		</UserContext.Provider>
	);
};

// Custom hook for easy usage of context
export const useUser = () => useContext(UserContext);
