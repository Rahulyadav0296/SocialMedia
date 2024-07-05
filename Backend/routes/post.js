const express = require("express");
const router = express.Router();
const multer = require("multer"); // add an object or file to request object
const path = require("path");
const postController = require("../controllers/post");

// configuring the multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

router.get("/", postController.getPosts);
router.post("/", upload.single("file"), postController.createPost);
router.post("/like/:postId", postController.likePost);
router.post("/comment/:postId", postController.commentOnPost);
module.exports = router;
