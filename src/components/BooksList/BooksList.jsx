import { useState, useEffect } from "react";
import { getAllBooks } from "../../services/bookServices";
import Book from "../Book/Book";

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

  return (
    <div>
      {books.map((book) => (
        <Book key={book.Id} book={book} />
      ))}
    </div>
  );
};

export default BookList;
