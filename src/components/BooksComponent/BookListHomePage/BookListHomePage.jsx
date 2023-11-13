import { useState, useEffect } from "react";
import { getAllBooks } from "../../../services/bookServices";
import Book from "../Book/Book";

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
    <div>
      {books.map((book) => (
        <div key={book.Id}>
          <Book book={book} />
        </div>
      ))}
    </div>
  );
};

export default BookListHomePage;
