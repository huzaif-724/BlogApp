import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home"
import Posts from "./pages/Posts";
import AddPost from "./pages/AddPost"
import MyPost from "./pages/MyPost";

function App() {
  return (
    <>
       <div className="bg-richblack-900">
       <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/addPost" element={<AddPost />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/myPosts" element={<MyPost />} />
          
        </Routes>
       </div>
        
     

    
        


  </>
  );
}

export default App;
