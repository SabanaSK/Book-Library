import { useState, useEffect } from "react";
import { getAllBooks } from "../../../services/bookServices";
import Book from "../Book/Book";
import DeleteBook from "../DeleteBook/DeleteBook";
import { Link } from "react-router-dom";
import styles from "./BookList.module.css";

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getAllBooks()
      .then((res) => {
        setBooks(res.data);
      })
      .catch((err) => {
        console.error("Error fetching books:", err);
      });
  }, []);

  const handleDeleteSuccess = (deletedBookId) => {
    const updatedBooks = books.filter((book) => book.Id !== deletedBookId);
    setBooks(updatedBooks);
  };

  return (
    <div className={styles["books-list"]}>
      {books.map((book) => (
        <div key={book.Id} className={styles["book-item"]}>
          <Book book={book} />
          <DeleteBook
            bookId={book.Id}
            bookTitle={book.title}
            onDeleteSuccess={handleDeleteSuccess}
          />
          <Link to={`/edit-book/${book.Id}`}>
            <button className={styles["edit-button"]}>Edit</button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default BookList;
