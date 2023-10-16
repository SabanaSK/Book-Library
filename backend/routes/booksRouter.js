import express from "express";
import booksControllers from "../controllers/booksControllers.js";

const router = express.Router();

router.get("/getAllPosts", booksControllers.getAllPosts);
router.get("/getPostById/:id", booksControllers.getPostById);
router.post("/createNewPost", booksControllers.createNewPost);
router.delete("/deleteById/:id", booksControllers.deleteById);
export default router;
