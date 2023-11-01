import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { getBookById } from "../../services/bookService";
import { useEffect, useState } from "react";

const BookPage = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState("");

  useEffect(() => {
    getBookById(bookId)
      .then((res) => {
        setBook(res.data);
      })
      .catch((error) => {
        console.error("Error fetching book by id:", error);
      });
  }, [bookId]);


  return (
    <div>
      <h2>{book.title}</h2>
      <p>{book.genre}</p>
      <p>{book.author}</p>
    </div>
  );
};

BookPage.propTypes = {
  book: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
  }),
};

export default BookPage;
