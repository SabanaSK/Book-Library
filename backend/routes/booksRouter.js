import express from "express";
import booksControllers from "../controllers/booksControllers.js";
import verifyAdmin from "../middleware/verify.js";
const router = express.Router();

router.get("/", booksControllers.getAllPosts);
router.get("/:id", booksControllers.getPostById);
router.post("/", verifyAdmin, booksControllers.createNewPost);
router.put("/:id", booksControllers.updatePostById);
router.delete("/:id", booksControllers.deleteById);

export default router;
