import axios from "axios";
import React, { useState, useEffect } from "react";
import PostCard from "../components/PostCard";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader"

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    
    const fetchPosts = async () => {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login"); // Redirect to login if no token
        return;
    }

      try {
        const response = await axios.get("/api/posts/posts");
        const { success, posts, message } = response.data;

        if (!success) {
          setError(message);
          return;
        }

        console.log('response :>> ', response);

        setPosts(posts);
        // console.log("posts :>> ", posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setError("Something went wrong!");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []); // Empty dependency array to run the effect only once on component mount

  
  return (
    <div className=" py-20 min-h-screen h-full">
      {loading && <Loader/>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="flex justify-evenly mt-6 flex-wrap">
        {posts.map((post) => (
          <PostCard
            key={post._id}
            id = {post._id}
            title={post.title}
            content={post.content}
            authorName = {post.authorName}
            like = {post.likes.length}
            flagDelete = {false}
          ></PostCard>
        ))}
      </div>
    </div>
  );
};

export default Posts;
