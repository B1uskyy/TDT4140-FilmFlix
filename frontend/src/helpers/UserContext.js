// In UserContext.js
import React, { createContext, useState, useContext } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const [user, setUser] = useState(null); // null initially, or could load from localStorage/sessionStorage

	return (
		<UserContext.Provider value={{ user, setUser }}>
			{children}
		</UserContext.Provider>
	);
};

// Custom hook for easy usage of context
export const useUser = () => useContext(UserContext);
