import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getBookById, editBooks } from "../../../services/bookServices";
import Input from "../../../components/ui/Input/Input";
import Loading from "../../../components/ui/Loading/Loading";
import { getCurrentUser, autoLogin } from "../../../services/userServices";
import styles from "./EditBookPage.module.css";

const EditBookPage = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [book, setBook] = useState({
    Id: "",
    title: "",
    genre: "",
    author: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    getBookById(bookId)
      .then((res) => {
        setBook(res.data);
      })
      .catch((err) => {
        console.error("Error fetching book:", err);
      });
  }, [bookId]);

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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let formIsValid = true;
    let errors = {};
    if (!book.title) {
      formIsValid = false;
      errors["title"] = "Title is required.";
    }

    setErrors(errors);
    return formIsValid;
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      editBooks(bookId, book)
        .then(() => {
          navigate("/adminBooks");
        })
        .catch((err) => {
          console.error("Error updating book:", err);
        });
    }
  };

  return (
    <div>
      <Link className={styles["goback-button"]} to={`/adminBooks`}>
        <p> ← Go Back</p>
      </Link>
      <div className={styles["edit-book-container"]}>
        <h2 className={styles["edit-book-header"]}>Edit Book</h2>
        <form onSubmit={handleSubmit}>
          <Input
            label="Title"
            type="text"
            name="title"
            value={book.title}
            onChange={handleChange}
            placeholder="Enter book title"
            className={styles["input-field"]}
          />
          {errors.title && (
            <p className={styles["error-message"]}>{errors.title}</p>
          )}

          <Input
            label="Genre"
            type="text"
            name="genre"
            value={book.genre}
            onChange={handleChange}
            placeholder="Enter book genre"
            className={styles["input-field"]}
          />
          {errors.genre && (
            <p className={styles["error-message"]}>{errors.genre}</p>
          )}

          <Input
            label="Author"
            type="text"
            name="author"
            value={book.author}
            onChange={handleChange}
            placeholder="Enter author name"
            className={styles["input-field"]}
          />
          {errors.author && (
            <p className={styles["error-message"]}>{errors.author}</p>
          )}

          <button type="submit" className={styles["submit-button"]}>
            Update Book
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditBookPage;
