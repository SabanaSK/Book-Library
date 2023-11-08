import api from "./api";

export const getAllBooks = () => {
  return api.get("/books");
};

export const getBookById = (bookId) => {
  return api.get(`/books/${bookId}`);
};
export const createBooks = (bookData) => {
  return api.post("/books", bookData);
};
export const editBooks = (bookId, bookData) => {
  return api.put(`/books/${bookId}`, bookData);
};
