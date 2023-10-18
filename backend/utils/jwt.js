import jwt from "jsonwebtoken";

const generateAccessToken = (user) => {
  const payload = {
    user: {
      id: user.id,
    },
  };
  return jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "1h" });
};

const generateRefreshToken = (user) => {
  const payload = {
    user: {
      id: user.id,
    },
  };
  return jwt.sign(payload, process.env.JWT_REFRESH_KEY, {
    expiresIn: "7d",
  });
};

const verifyAccessToken = (token) => {
  return jwt.verify(token, process.env.JWT_KEY);
};

const verifyRefreshToken = (token) => {
  return jwt.verify(token, process.env.JWT_REFRESH_KEY);
};
export {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
