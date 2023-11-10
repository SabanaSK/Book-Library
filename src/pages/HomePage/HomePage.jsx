import LogoutButton from "../../components/UsersComponent/LogoutButton/LogoutButton";
import Navbar from "../../components/ui/navbar/navbar";

import Loading from "../../components/ui/Loading/Loading";
import { getCurrentUser } from "../../services/userServices";
import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    initializePage();
  });

  const initializePage = async () => {
    setIsLoading(true);
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setIsLoading(false);
      navigate("/");
      return;
    }
    await validateToken(token);
  };

  const validateToken = async (token) => {
    try {
      await getCurrentUser(token);
      setIsAuthenticated(true);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to fetch current user:", error);
      setIsAuthenticated(false);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    navigate("/");
    return null;
  }

  return (
    <div>
      <Navbar />
      <p>Home Page</p>
      <p>Welcome to Book Library</p>
      <LogoutButton />
    </div>
  );
};

export default HomePage;
