import { useNavigate } from "react-router";
import BookList from "../../../components/BooksComponent/BooksList/BooksList";
import Loading from "../../../components/ui/Loading/Loading";
import { getCurrentUser, autoLogin } from "../../../services/userServices";
import { useState, useEffect } from "react";
import Navbar from "../../../components/ui/navbar/navbar";
import styles from "./AdminBookPage.module.css";

const AdminBooksPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    initializePage();
  }, []);

  const initializePage = async () => {
    setIsLoading(true);
    const token = localStorage.getItem("accessToken");
    if (!token) {
      await tryAutologin();
    }
    await validateToken(token);
    setIsLoading(false);
  };

  const tryAutologin = async () => {
    try {
      const response = await autoLogin();
      setIsLoading(false);
      setIsAuthenticated(true);
      const newToken = response.data.accessToken;
      localStorage.setItem("accessToken", newToken);
      return;
    } catch (autoLoginError) {
      setIsLoading(false);
      setIsAuthenticated(false);
      localStorage.removeItem("accessToken");
      navigate("/");
      return Promise.reject(autoLoginError);
    }
  };
  
  const validateToken = async (token) => {
    try {
      const response = await getCurrentUser(token);
      if (response.data.user.role == "admin") {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
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

  const handleCreateClick = () => {
    navigate("/create-book");
  };

  return (
    <div>
      <Navbar />
      <div className={styles["container"]}>
        <h1 className={styles["header"]}>Books Management</h1>
        <div className={styles["section"]}>
          <button
            type="button"
            onClick={handleCreateClick}
            className={styles["button"]}
          >
            Create Book
          </button>
        </div>
        <BookList />
      </div>
    </div>
  );
};
export default AdminBooksPage;
