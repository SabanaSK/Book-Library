import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBookById, editBooks } from "../../../services/bookServices";
import Input from "../../ui/Input";

const EditBook = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
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
        console.log(res.data);
        setBook(res.data);
      })
      .catch((err) => {
        console.error("Error fetching book:", err);
      });
  }, [bookId]);

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
    console.log("Sending this data to the server:", book);
    if (validateForm()) {
      editBooks(bookId, book)
        .then(() => {
          navigate("/admin");
        })
        .catch((err) => {
          console.error("Error updating book:", err);
        });
    }
  };

  return (
    <div>
      <h2>Edit Book</h2>
      <form onSubmit={handleSubmit}>
        <Input
          label="Title"
          type="text"
          name="title"
          value={book.title}
          onChange={handleChange}
          placeholder="Enter book title"
        />
        {errors.title && <p className="error">{errors.title}</p>}

        <Input
          label="Genre"
          type="text"
          name="genre"
          value={book.genre}
          onChange={handleChange}
          placeholder="Enter book genre"
        />
        {errors.genre && <p className="error">{errors.genre}</p>}

        <Input
          label="Author"
          type="text"
          name="author"
          value={book.author}
          onChange={handleChange}
          placeholder="Enter author name"
        />
        {errors.author && <p className="error">{errors.author}</p>}
        <button type="submit">Update Book</button>
      </form>
    </div>
  );
};

export default EditBook;