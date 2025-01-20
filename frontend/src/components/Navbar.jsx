import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../slices/authSlice"
import { AiOutlineMenu } from "react-icons/ai";
import logo from "../assets/logo.png"; // Replace with your logo path

const Navbar = () => {
  const { token } = useSelector((state) => state.auth); // Access token from Redux state
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout()); // Dispatch logout action
    navigate("/"); // Redirect to login page
  };

  return (
    <div
        className="flex h-16 z-10 items-center justify-center border-b-[1px] bg-richblack-800 border-b-richblack-700 fixed w-full"
    >
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="Logo" width={60} height={32} />
        </Link>

        {/* Buttons */}
        <div className="flex items-center gap-4">
          {token ? (
            <>
              <div className="relative inline-block text-left">
                <div className="flex items-center ">
                  
                  <select
                    onChange={(e) => navigate(e.target.value)}
                    className="block w-42 border-none hover:bg-blue-800 text-white rounded-md bg-blue-600 border border-gray-300 px-4 py-2 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="/posts">All Posts</option>
                    <option value="/addPost">Add Post</option>
                    <option value="/myPosts">My Posts</option>
           </select>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="rounded-md border border-blue-700 bg-blue-600 px-4 py-2 text-white hover:bg-blue-800"
              >
                Logout
              </button>
              
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="rounded-md border border-blue-700 bg-blue-600 px-4 py-2 text-white hover:bg-blue-800">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="rounded-md border border-blue-700 bg-blue-600 px-4 py-2 text-white hover:bg-blue-800">
                  Signup
                </button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="block md:hidden">
          <AiOutlineMenu fontSize={24} />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
