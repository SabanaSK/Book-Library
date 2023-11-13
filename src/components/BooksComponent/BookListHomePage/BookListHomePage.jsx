import { useState, useEffect } from "react";
import { getAllBooks } from "../../../services/bookServices";
import Book from "../Book/Book";
import styles from "./BookListHomePage.module.css";
const BookListHomePage = () => {
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
  return (
    <div className={styles["book-list"]}>
      {books.map((book) => (
        <div key={book.Id} className={styles["book-item"]}>
          <Book book={book} />
        </div>
      ))}
    </div>
  );
};

export default BookListHomePage;
