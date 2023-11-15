export const validationUsername = (username) => {
  if (!username.trim()) return "Username is required";
  return "";
};

export const validatePassword = (password) => {
  const minLength = 8;
  const maxLength = 20;

  if (password.length < minLength || password.length > maxLength) {
    return "Password must be between 8 and 20 characters long.";
  }
  if (!/[a-z]/.test(password)) {
    return "Password must contain at least one lowercase letter.";
  }
  if (!/[A-Z]/.test(password)) {
    return "Password must contain at least one uppercase letter.";
  }
  if (!/[0-9]/.test(password)) {
    return "Password must contain at least one number.";
  }
  if (!/[@$!%*?&_]/.test(password)) {
    return "Password must contain at least one special character (@, $, !, %, *, ?, &, or _).";
  }
  return "";
};
export const validateEmail = (email) => {
  if (!email.includes("@")) return "Email must contain '@'";
  return "";
};
