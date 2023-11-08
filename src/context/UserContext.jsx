import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { getCurrentUser } from "../services/userServices";

export const UserContext = createContext(null);

export const UserContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const loadCurrentUser = async () => {
      try {
        const response = await getCurrentUser();
        setCurrentUser(response.data.user);
      } catch (error) {
        console.error("Failed to fetch current user:", error);
      }
    };

    loadCurrentUser();
  }, []);

  const value = {
    currentUser,
    setCurrentUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
