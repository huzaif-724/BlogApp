import React, { useEffect, useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PostCard from "../components/PostCard";
import Loader from "../components/Loader"



const MyPost = () => {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate()


    useEffect(() => {
    
        const fetchPosts = async () => {
          setLoading(true);
          setError("");
    
          const token = localStorage.getItem("token");
    
          if (!token) {
            navigate("/login"); 
            return;
        }
    
          try {
            const response = await axios.get("/api/posts/userPost");
            const { success, posts, message } = response.data;
    
            if (!success) {
              setError(message);
              return;
            }
    
            setPosts(posts);
        
          } catch (error) {
            console.error("Error fetching posts:", error);
            // setError("Doesn't have Post");
          } finally {
            setLoading(false);
          }
        };
    
        fetchPosts();
      }, [navigate]);

      const handleDelete = (postId) => {
        setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
      };

    //   useEffect(() => {
    //     if (posts.length === 0) {
    //       setError("Don't have posdts");
    //     } else {
    //       setError(""); // Reset error if there are posts
    //     }
    //   }, [posts]);
    


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
                flagDelete = {true}
                flagEdit = {true}
                onDelete={handleDelete}
              ></PostCard>
            ))}
          </div>
        </div>
      );
};

export default MyPost;
