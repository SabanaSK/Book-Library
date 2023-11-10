import api from "./api";

export const inviteUserByEmail = (username, email) => {
  return api.post("/users/invite", { username, email });
};

export const register = (inviteToken, password) => {
  return api.post(`/users/register?token=${inviteToken}`, {
    password,
  });
};

export const loginUser = (email, password) =>
  api.post("/users/login", { email, password });

export const autoLogin = () => {
  return api.post("/users/autoLogin");
};

export const getCurrentUser = () => {
  return api.get("/users/currentUser");
};

export const forgotPassword = (email) => {
  return api.post("/users/forgotPassword", { email });
};

export const resetPassword = (resetToken, newPassword, confirmPassword) => {
  return api.post(`/users/resetPassword?token=${resetToken}`, {
    newPassword,
    confirmPassword,
  });
};

export const logoutUser = () => {
  return api.delete("/tokens/logout");
};

export const updateUser = (userId, data) => {
  return api.patch(`/users/${userId}`, data); 
};

export const getAllUsers = () => {
  return api.get("/users/");
};

export const getUserById = (userId) => {
  return api.get(`/users/${userId}`);
};

export const deleteUser = (userId) => {
  return api.delete(`/users/${userId}`);
};


