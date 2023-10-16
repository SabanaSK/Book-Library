import Post from "../models/Post.js";

const getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.findAll();
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error", error: error.message });
    next(error);
  }
};

const getPostById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error", error: error.message });
    next(error);
  }
};

const createNewPost = async (req, res, next) => {
  try {
    let { title, image, genre, author } = req.body;
    let post = new Post(title, image, genre, author);

    // eslint-disable-next-line no-unused-vars
    post = await post.save();
    res.status(201).json({ message: "Post created" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error", error: error.message });
    next(error);
  }
};
const deleteById = async (req, res, next) => {
  try {
    const id = req.params.id;
    await Post.deleteById(id);

    res.status(200).json({ message: "Post deleted successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error", error: error.message });
    next(error);
  }
};

export default { createNewPost, getAllPosts, getPostById, deleteById };
