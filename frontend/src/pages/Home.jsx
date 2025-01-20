import React from "react"
import { Navigate, useNavigate } from "react-router-dom";
import heroImg from "../assets/hero image.webp";
import { PiShareFatFill } from "react-icons/pi";

const Home = () => {

  const navigate = useNavigate();
  return (
    <div className=" bg-richblack-900 w-full h-screen overflow-y-hidden flex justify-center items-center">

        <div className="relative mx-auto flex w-11/12 max-w-maxContent items-center justify-between gap-8 text-white">

        <div className="">
            <div className="text-center text-4xl space-y-4 ml-12 font-semibold bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text">
            Every Thought Matters <br /> Write, Share & Inspire. <br /> Start Exploring <br></br>
  
                      <button onClick={()=> navigate("/login")} className=" text-xl ml-24 w-[120px] hover:bg-richblack-900 border border-solid border-white py-2 px-4 rounded-lg bg-richblack-800 text-white flex items-center gap-3">
                              <p className=" bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text">Share</p> 
                              <PiShareFatFill className=" text-white"/>
                        </button>
                 
        
            </div>
        </div>
      
      <img src={heroImg} alt="" className=" w-[58%] h-[70%] mt-16" />
    </div>
    </div>
  )
};

export default Home;
