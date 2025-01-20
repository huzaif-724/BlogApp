import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setToken } from "../slices/authSlice"; // Import action to set token
import axios from "axios";
import { Link } from "react-router-dom";

const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const [formData, setFormData] = useState({

        email : "",
        password : ""
    })

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        
        e.preventDefault();
        setError(""); // Reset error state
    
        // Basic form validation
        if (!formData.email || !formData.password) {
            return setError("All fields are required.");
        }
    
        setLoading(true);
        try {
            const response = await axios.post("/api/auth/login", {
                email: formData.email,
                password: formData.password,
            });
    
            const { success, token, message } = response.data;
    
            if (!success) {
                setError(message); // Show the backend error message
                setLoading(false);
                return;
            }
    
            // Save token to Redux and localStorage
            dispatch(setToken(token));
            localStorage.setItem("token", JSON.stringify(token));
    
            navigate("/posts"); // Redirect to homepage
        } catch (error) {
            console.error(error);
    
            // Handle backend error responses
            if (error.response && error.response.data) {
                setError(error.response.data.message || "Something went wrong. Please try again.");
            } else {
                setError("Failed to log in. Please try again.");
            }
        }
        setLoading(false);
    };




  return (
     <div className="flex items-center justify-center min-h-screen bg-gray-100 ">
          <div className="w-full max-w-md p-6 bg-white rounded-md shadow-[10px_20px_20px_rgba(8,_112,_184,_0.7)]
">
            <h2 className="text-2xl font-bold text-center text-gray-800">Log in</h2>
            {error && <p className="text-red-600 text-center">{error}</p>}
            <form onSubmit={handleSubmit} className="mt-4">   
              {/* Email */}
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  required
                />
              </div>
              {/* Password */}
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  required
                />
              </div>
              {/* Submit Button */}
              <button
                type="submit"
                className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
                disabled={loading}
              >
                {loading ? "Loging..." : "Log in"}
              </button>
            </form>
            <p className="mt-4 text-sm text-center text-gray-600">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-600 hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
  )
};

export default Login;
