import express from "express";
import usersControllers from "../controllers/usersControllers.js";
import verifyAdmin from "../middleware/verify.js";

const router = express.Router();

router.post("/login", usersControllers.login);
router.post("/autoLogin", usersControllers.autoLogin);

//These two might be delete or edit
router.get("/", verifyAdmin, usersControllers.getAllUsers);
router.delete("/:id", verifyAdmin, usersControllers.deleteById);

export default router;
