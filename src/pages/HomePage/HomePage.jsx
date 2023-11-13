import Navbar from "../../components/ui/navbar/navbar";
import styles from "./HomePage.module.css";
import Loading from "../../components/ui/Loading/Loading";
import { getCurrentUser } from "../../services/userServices";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BookListHomePage from "../../components/BooksComponent/BookListHomePage/BookListHomePage";

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    initializePage();
  }, []);

  const initializePage = async () => {
    setIsLoading(true);
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setIsLoading(false);
      navigate("/");
      return;
    }
    await validateToken(token);
    setIsLoading(false);
  };

  const validateToken = async (token) => {
    try {
      await getCurrentUser(token);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Failed to fetch current user:", error);
      setIsAuthenticated(false);
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
    <div className={styles["home-container"]}>
      <Navbar />
      <div className={styles["main-content"]}>
        <h1 className={styles["heading-container"]}>Home Page</h1>
        <p className={styles["welcome-heading"]}>Welcome to Book Library</p>
        <BookListHomePage />
      </div>
    </div>
  );
};

export default HomePage;
