import api from "./api";

export const loginUser = (email, password) =>
  api.post("/users/login", { email, password });

export const getAllBooks = () => {
  return api.get("/books");
};

export const getBookById = (bookId) => {
  return api.get(`/books/${bookId}`);
};

export const logoutUser = () => {
  return api.delete("/tokens/logout");
};