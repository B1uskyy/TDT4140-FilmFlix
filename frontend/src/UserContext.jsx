import React, { useState, useContext } from "react";

const UserNameContext = React.createContext();
const UpdateUserNameContext = React.createContext();

export const useUserName = () => {
    return useContext(UserNameContext);
};

export const useUpdateUserName = () =>{
    return useContext(UpdateUserNameContext);
};

export const UserProvider = ({ value, children }) => {
    const [userName, setUserName] = useState(value);
    return (
        <UpdateUserNameContext.Provider value={setUserName}>
            {children}
        </UpdateUserNameContext.Provider>
    );
};

export default UserProvider;