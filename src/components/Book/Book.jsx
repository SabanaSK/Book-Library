import PropTypes from "prop-types";

const Book = (book) => (
  <div>
      <img src={book.image} alt={book.title} />
      <p>{book.title}</p>
  </div>
);

// Must add require later
Book.propTypes = {
	book: PropTypes.shape({
		id: PropTypes.number,
		image: PropTypes.string,
		title: PropTypes.string,
	})
};

export default Book;
