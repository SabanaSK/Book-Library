import Post from "../models/Post.js";

const createNewPost = async (req, res, next) => {
  try {
    let { title, body } = req.body;
    let post = new Post(title, body);

    // eslint-disable-next-line no-unused-vars
    post = await post.save();
    res.status(201).json({ message: "Post created" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error", error: error.message });
    next(error);
  }
};

export default createNewPost;
