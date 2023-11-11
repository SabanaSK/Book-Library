import { useState, useEffect } from "react";
import { getAllBooks } from "../../../services/bookServices";
import Book from "../Book/Book";
import DeleteBook from "../DeleteBook/DeleteBook";

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
    <div>
      {books.map((book) => (
        <div key={book.Id}>
          <Book book={book} />
          <DeleteBook
            bookId={book.Id}
            bookTitle={book.title}
            onDeleteSuccess={handleDeleteSuccess}
          />
        </div>
      ))}
    </div>
  );
};

export default BookList;
