import { useState, useEffect } from "react";
import axios from "axios";
import Book from "../Book/Book";

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get("/api/books")
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
