import express from "express";
import booksControllers from "../controllers/booksControllers.js";

const router = express.Router();

router.get("/getAllPosts", booksControllers.getAllPosts);
router.post("/createNewPost", booksControllers.createNewPost);

export default router;
