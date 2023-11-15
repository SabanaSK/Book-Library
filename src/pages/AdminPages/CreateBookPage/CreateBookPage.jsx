import { useState, useRef, useEffect } from "react";
import Input from "../../../components/ui/Input/Input";
import { createBooks } from "../../../services/bookServices";
import Loading from "../../../components/ui/Loading/Loading";
import { getCurrentUser, autoLogin } from "../../../services/userServices";
import { useNavigate, Link } from "react-router-dom";
import styles from "./CreateBookPage.module.css";

const CreateBookPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [newBook, setNewBook] = useState({
    id: "",
    title: "",
    genre: "",
    author: "",
  });
  const [errors, setErrors] = useState({
    id: "",
    title: "",
    genre: "",
    author: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const formRef = useRef(null);

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
    navigate("/home");
    return null;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBook((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let tempErrors = {};
    tempErrors.title = newBook.title ? "" : "Title is required";
    tempErrors.genre = newBook.genre ? "" : "Genre is required";
    tempErrors.author = newBook.author ? "" : "Author is required";
    setErrors(tempErrors);
    return !Object.values(tempErrors).some((x) => x !== "");
  };
  const resetform = () => {
    if (formRef.current) {
      formRef.current.reset();
      setNewBook({
        title: "",
        genre: "",
        author: "",
      });
      setErrors({
        title: "",
        genre: "",
        author: "",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await createBooks(newBook);
        setSuccessMessage("Book created successfully!");
        resetform();
      } catch (error) {
        if (error.response && error.response.status === 409) {
          setSuccessMessage(error.response.data.message);
        } else {
          console.error("Error creating book:", error);
          setSuccessMessage("");
        }
      }
    }
  };

  return (
    <div>
      <Link className={styles["goback-button"]} to={`/adminBooks`}>
        <p> ← Go Back</p>
      </Link>
      <div className={styles["create-book-container"]}>
        <h2 className={styles["header"]}>Create Book</h2>
        <form onSubmit={handleSubmit} ref={formRef}>
          <Input
            label="Title"
            type="text"
            name="title"
            onChange={handleInputChange}
            placeholder="Enter book title"
            value={newBook.title}
          />
          {errors.title && (
            <p className={styles["error-message"]}>{errors.title}</p>
          )}
          <Input
            label="Genre"
            type="text"
            name="genre"
            onChange={handleInputChange}
            placeholder="Enter book genre"
            value={newBook.genre}
          />
          {errors.genre && (
            <p className={styles["error-message"]}>{errors.genre}</p>
          )}
          <Input
            label="Author"
            type="text"
            name="author"
            onChange={handleInputChange}
            placeholder="Enter author name"
            value={newBook.author}
          />
          {errors.author && (
            <p className={styles["error-message"]}>{errors.author}</p>
          )}
          {successMessage && (
            <div className={styles["success-message"]}>{successMessage}</div>
          )}
          <button type="submit" className={styles["submit-button"]}>
            Create Book
          </button>
        </form>
      </div>
    </div>
  );
};
export default CreateBookPage;
