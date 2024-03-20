// In UserContext.js
import React, { createContext, useState, useContext } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [markedMovies, setMarkedMovies] = useState([]);

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
