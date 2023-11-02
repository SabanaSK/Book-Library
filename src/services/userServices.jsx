import api from "./api";

export const inviteUserByEmail = (username, email) => {
  return api.post("/users/invite", { username, email });
};
