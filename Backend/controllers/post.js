const Post = require("../models/post");

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const file = req.file ? req.file.filename : undefined;

    if (!title || !content) {
      return res.json(400).json({ error: "Title and content fields required" });
    }

    const newPost = new Post({
      title,
      content,
      file,
    });
    await newPost.save();
    res
      .status(201)
      .json({ message: "Post added to the page successfully!", post: newPost });
  } catch (error) {
    console.error("Error Creating Post", error);
    res.status(500).json({ error: "Inter server Error" });
  }
};

const likePost = async (req, res) => {
  try {
    //take the id of the posts
    const postId = req.params.postId;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "Post Not Found" });
    }

    post.likes += 1;
    await post.save();
    res.json(post);
  } catch (err) {
    console.log("Error Liking Post", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const commentOnPost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const { text } = req.body;
    console.log("Incoming Request body", req.body);
    // Server-side validation
    if (!text || text.trim() === "") {
      return res.status(400).json({ error: "Comment text cannot be empty" });
    }

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "Post Not Found" });
    }

    post.comments.push({ text });
    await post.save();
    res.json(post);
  } catch (error) {
    console.log("Error Adding Comments: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getPosts, createPost, likePost, commentOnPost };
