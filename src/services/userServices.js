import api from "./api";

export const inviteUserByEmail = (username, email) => {
  return api.post("/users/invite", { username, email });
};

export const register = (inviteToken, password) => {
  return api.post(`/users/register?token=${inviteToken}`, {
    password,
  });
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
export const loginUser = (email, password) =>
  api.post("/users/login", { email, password });

export const logoutUser = () => {
  return api.delete("/tokens/logout");
};

export const autoLogin = () => {
  return api.post("/users/autoLogin");
};
