import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./book.module.css";
const Book = ({ book }) => {
  return (
    <div>
    <Link className={styles["books"]} to={`/book/${book.Id}`}>
      <p className={styles["book-title"]}>
        <strong>Title:</strong> {book.title}
      </p>
      <p className={styles["book-genre"]}>
        <strong>Genre:</strong> {book.genre}
      </p>
      <p className={styles["book-author"]}>
        <strong>Author:</strong> {book.author}
      </p>
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
