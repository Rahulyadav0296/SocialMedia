import React, { useState } from "react";
import "./CreatePost.css";
function CreatePost() {
  const [posts, setPosts] = useState({
    title: "",
    content: "",
  });
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPosts((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const formData = new FormData();
  formData.append("title", posts.title);
  formData.append("content", posts.content);
  if (file) {
    formData.append("file", file);
  }

  const handlePost = async (e) => {
    e.preventDefault();
    try {
      const responce = await fetch("http://localhost:3000/api/posts", {
        method: "POST",
        body: formData,
      });
      const data = await responce.json();
      console.log(data.message);
      setMessage(data.message);
      setPosts({
        title: "",
        content: "",
      });
      setFile(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="create-post">
      <h1>Create a Post</h1>
      <form onSubmit={handlePost} className="create-post-form">
        <input
          type="text"
          name="title"
          value={posts.title}
          onChange={handleChange}
          placeholder="Title"
          className="create-post-input"
        />
        <textarea
          name="content"
          value={posts.content}
          onChange={handleChange}
          placeholder="Content"
          className="create-post-textarea"
        />
        <input
          type="file"
          name="file"
          onChange={handleFileChange}
          className="create-post-file"
        />
        <button type="submit" className="create-post-button">
          POST
        </button>
      </form>
      <p className="message">{message}</p>
    </div>
  );
}

export default CreatePost;
