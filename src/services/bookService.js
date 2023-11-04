import api from "./api";

export const getAllBooks = () => {
  return api.get("/books");
};

export const getBookById = (bookId) => {
  return api.get(`/books/${bookId}`);
};
