import Token from "../models/Token.js";

const getAllRefreshToken = async (req, res, next) => {
  try {
    const token = await Token.findAll();
    res.status(200).json(token);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error", error: error.message });
    next(error);
  }
};

const deleteTokenById = async (req, res, next) => {
  try {
    const id = req.params.id;
    await Token.deleteById(id);
    res.status(200).json({ message: "Token is deleted successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error", error: error.message });
    next(error);
  }
};

const deleteAllTokenByUserId = async (req, res, next) => {
  try {
    const userId = req.params.id;

    await Token.deleteByUserId(userId);
    res.status(200).json({ message: "All Token is deleted successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error", error: error.message });
    next(error);
  }
};
export default { getAllRefreshToken, deleteTokenById, deleteAllTokenByUserId };
