import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const AddPost = () => {


    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({

        title : "",
        content: ""
    })

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login"); // Navigate if token is missing
        }
    }, [navigate]); 

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        
        e.preventDefault();
        setError(""); // Reset error state
    
        // Basic form validation
        if (!formData.title || !formData.content) {
            return setError("All fields are required.");
        }
    
        setLoading(true);
        try {
            const response = await axios.post("/api/posts/create", {
                title: formData.title,
                content: formData.content,
            });
    
            const { success, message } = response.data;
    
            if (!success) {
                setError(message); // Show the backend error message
                setLoading(false);
                return;
            } 
    
            navigate("/posts"); // Redirect to homepage
        } catch (error) {
            console.error(error);
    
            // Handle backend error responses
            if (error.response && error.response.data) {
                setError(error.response.data.message || "Something went wrong. Please try again.");
            } else {
                setError("Failed to create post. Please try again.");
            }
        }
        setLoading(false);
    };




  return (
     <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="w-full max-w-md p-6 bg-richblue-500 text-white rounded-md shadow-md">
            <h2 className="text-2xl font-bold text-center text-gray-800">Create New Post</h2>
            {error && <p className="text-red-600 text-center">{error}</p>}
            <form onSubmit={handleSubmit} className="mt-4">   
               {/* Password */}
               <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="title"
                  autocomplete="off"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-3 text-black py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  required
                />
              </div>
              {/* Password */}
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Content
                </label>
                <input
                  type="text"
                  id="content"
                  name="content"
                   autocomplete="off"
                  value={formData.content}
                  onChange={handleInputChange}
                  className="w-full px-3 pt-2 text-black h-[200px] mt-1 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  required
                  placeholder="Content"
                />

              </div>
              {/* Submit Button */}
              <button
                type="submit"
                className="w-full px-4 py-2 text-white bg-richblack-900 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
                disabled={loading}
              >
                {loading ? "Posting..." : "Post"}
              </button>
            </form>
           
          </div>
        </div>
  )
};

export default AddPost;
