const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Post = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  file: {
    type: String,
  },
  likes: {
    type: Number,
    default: 0,
  },
  comments: [{ text: String }],
});

module.exports = mongoose.model("Post", Post);
