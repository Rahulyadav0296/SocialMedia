const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const postRouter = require("./routes/post");
const path = require("path");
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(bodyParser.urlencoded({ encoded: false }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

mongoose
  .connect("mongodb://localhost:27017/SocialMedia")
  .then((result) => {
    app.listen(3000, () => {
      console.log("Database connected!");
    });
  })
  .catch((err) => {
    console.error(err);
  });

app.use("/api/posts", postRouter);
