import express from "express";
import usersControllers from "../controllers/usersControllers.js";

const router = express.Router();

router.post("/login", usersControllers.login);
router.post("/autoLogin", usersControllers.autoLogin);

//These two might be delete or edit
router.get("/", usersControllers.getAllUsers);
router.delete("/:id", usersControllers.deleteById);

export default router;
