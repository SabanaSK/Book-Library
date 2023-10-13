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

export default BookPage;
