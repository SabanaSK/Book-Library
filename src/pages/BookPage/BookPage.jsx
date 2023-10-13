import PropTypes from "prop-types";

const BookPage = (bookItem) => {
  return (
    <div>
      <h2>{bookItem.title}</h2>
      <img src={bookItem.image} alt={bookItem.title} />
      <p>{bookItem.genre}</p>
      <p>{bookItem.author}</p>
    </div>
  );
};
// Must add require later
BookPage.propTypes = {
	bookItem: PropTypes.shape({
		image: PropTypes.string,
		title: PropTypes.string,
		genre: PropTypes.string,
		author: PropTypes.string,
	})
};
export default BookPage;
