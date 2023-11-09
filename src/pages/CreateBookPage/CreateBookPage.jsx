import { useState, useRef } from "react";
import Input from "../../components/ui/Input/Input";
import { createBooks } from "../../services/bookServices";
const CreateBookPage = () => {
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
        const response = await createBooks(newBook);
        console.log(response);
        setSuccessMessage("Book created successfully!");
        resetform();
      } catch (error) {
        console.error("Error creating book:", error);
        setSuccessMessage("");
      }
    } else {
      console.log("Form has errors");
    }
  };
  return (
    <div className="create-book-page">
      <h2>Create Book</h2>
      <form onSubmit={handleSubmit} ref={formRef}>
        <Input
          label="Title"
          type="text"
          name="title"
          onChange={handleInputChange}
          placeholder="Enter book title"
          value={newBook.title}
        />
        {errors.title && <p className="error">{errors.title}</p>}
        <Input
          label="Genre"
          type="text"
          name="genre"
          onChange={handleInputChange}
          placeholder="Enter book genre"
          value={newBook.genre}
        />
        {errors.genre && <p className="error">{errors.genre}</p>}
        <Input
          label="Author"
          type="text"
          name="author"
          onChange={handleInputChange}
          placeholder="Enter author name"
          value={newBook.author}
        />
        {errors.author && <p className="error">{errors.author}</p>}
        <button type="submit">Create Book</button>
        {/* Display the success message if it is set */}
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}
      </form>
    </div>
  );
};
export default CreateBookPage;
