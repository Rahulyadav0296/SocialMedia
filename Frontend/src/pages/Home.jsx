import React, { useEffect, useState } from "react";
import "./Home.css";

function Home() {
  const [posts, setPosts] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [showComment, setShowComment] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/posts");
        const data = await response.json();
        console.log(data);
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchDetails();
  }, []);

  const handleLike = async (postId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/posts/like/${postId}`,
        {
          method: "POST",
        }
      );
      const data = await response.json();
      const updatedPosts = posts.map((post) =>
        post._id === postId ? data : post
      );
      setPosts(updatedPosts);
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleComments = async (postId, commentText) => {
    console.log(commentText);

    if (!commentText || commentText.trim() === "") {
      console.error("Comment Text is Empty");
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:3000/api/posts/comment/${postId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: commentText }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response from server: ", errorData);
        return;
      }

      const data = await response.json();
      console.log(data);
      const updatedPosts = posts.map((post) =>
        post._id === postId ? data : post
      );
      setPosts(updatedPosts);
      setCommentText(" "); // Clear the input field after adding a comment
    } catch (error) {
      console.error("Error commenting on post:", error);
    }
  };

  const handleChange = (e) => {
    setCommentText(e.target.value);
  };

  return (
    <div className="details">
      {posts.map((post) => (
        <ul key={post._id} className="post">
          <li>
            {post.file && (
              <img
                src={`http://localhost:3000/uploads/${post.file}`}
                alt={post.title}
                className="post-image"
              />
            )}
            <p className="post-title">{post.title}</p>
            <p className="post-content">{post.content}</p>
            <div className="interest">
              <p>
                <i
                  className="fa-solid fa-thumbs-up"
                  onClick={() => handleLike(post._id)}
                ></i>
                {post.likes}
              </p>
              <p
                className="show-comments"
                onClick={() => {
                  setShowComment((prev) => !prev);
                }}
              >
                Comments: {post.comments?.length || 0}
              </p>
              {showComment && (
                <ul className="comment-list">
                  {post.comments?.map((comment, index) => (
                    <li key={index}>{comment.text}</li>
                  ))}
                </ul>
              )}
              <div className="comment-input">
                <input
                  type="text"
                  placeholder="Add a comment"
                  onChange={handleChange}
                />
                <button
                  onClick={() => handleComments(post._id, commentText)}
                  className="comment-button"
                >
                  Add Comment
                </button>
              </div>
            </div>
          </li>
        </ul>
      ))}
    </div>
  );
}

export default Home;
