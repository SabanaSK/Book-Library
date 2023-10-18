import express from "express";
import usersControllers from "../controllers/usersControllers.js";

const router = express.Router();

router.post("/", usersControllers.createNewUser);
router.post("/login", usersControllers.login);
router.post("/autoLogin", usersControllers.autoLogin);

export default router;
