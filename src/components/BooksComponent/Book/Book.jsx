import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Book = ({ book }) => {
  return (
    <div>
      <Link to={`/book/${book.Id}`}>
        <p>Title: {book.title}</p>
        <p>Genre: {book.genre}</p>
        <p>Author: {book.author}</p>
      </Link>
      <Link to={`/admin/edit-book/${book.Id}`}>
        <button>Edit ✏️</button>
      </Link>
    </div>
  );
};

Book.propTypes = {
  book: PropTypes.shape({
    Id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
  }).isRequired,
};

export default Book;
