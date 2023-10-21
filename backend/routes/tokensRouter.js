import express from "express";
import tokensControllers from "../controllers/tokensControllers.js";

const router = express.Router();

//might be delete
router.get("/", tokensControllers.getAllRefreshToken);

router.delete("/logout/:id", tokensControllers.deleteTokenById);
router.delete("/logoutAll/:id", tokensControllers.deleteAllTokenByUserId);

export default router;
