import api from "./api";

export const inviteUserByEmail = (username, email) => {
  return api.post("/users/invite", { username, email });
};
export const loginUser = (email, password) =>
  api.post("/users/login", { email, password });

export const logoutUser = () => {
  return api.delete("/tokens/logout");
};
