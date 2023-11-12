import { useNavigate } from "react-router";
import BookList from "../../../components/BooksComponent/BooksList/BooksList";
import Loading from "../../../components/ui/Loading/Loading";
import { getCurrentUser } from "../../../services/userServices";
import { useState, useEffect } from "react";
import Navbar from "../../../components/ui/navbar/navbar";

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
      setIsLoading(false);
      navigate("/");
      return;
    }
    await validateToken(token);
    setIsLoading(false);
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
      <p>BOOKS</p>
      <button type="button" onClick={handleCreateClick}>
        Create Book
      </button>
      <BookList />
    </div>
  );
};
export default AdminBooksPage;
