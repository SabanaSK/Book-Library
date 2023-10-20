export const validationUsername = (username) => {
  if (!username.trim()) return "Username is required";
  return "";
};

export const validatePassword = (password) => {
  const minLength = 5;
  if (password.length < minLength) {
    return "Password is required";
  }
  if (!/[a-z]/.test(password)) {
    return "Password must contain at least one lowercase letter.";
  }
  if (!/[0-9]/.test(password)) {
    return "Password must contain at least one number.";
  }
  return "";
};
export const validateEmail = (email) => {
  if (!email.includes("@")) return "Email must contain '@'";
  return "";
};
