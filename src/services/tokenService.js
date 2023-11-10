import api from "./api";

export const validateInviteToken = (inviteToken) => {
  return api.get(`/inviteTokens/validateInviteToken?token=${inviteToken}`);
};

export const validateResetToken = (resetToken) => {
  return api.get(`/resetTokens/validateResetToken?token=${resetToken}`);
};
