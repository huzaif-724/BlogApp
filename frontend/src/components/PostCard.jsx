import axios from "axios";
import React, { useState } from "react";
import love from "../assets/heart.svg";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

const PostCard = ({ title, content, authorName, id, like, flagDelete, onDelete }) => {
  const [likes, setLikes] = useState(like);
  const [isModalOpen, setModalOpen] = useState(false);

  const handler = async () => {
    try {
      const response = await axios.post(`/api/posts/like/${id}`);
      setLikes(response.data.likes);
    } catch (error) {
      console.error("Error updating like status:", error);
    }
  };

  const deleteHandler = async () => {
    try {
      const response = await axios.delete(`/api/posts/delete/${id}`);
      onDelete(id);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <>
      {/* Post Card */}
      <div className="w-[28%] shadow-[0_5px_15px_rgba(255,_255,_255,_0.5)] h-[250px] border border-solid border-black rounded-md  p-4 flex flex-col justify-between  text-white bg-richblue-400 mb-8 transform transition-transform duration-300 hover:scale-110">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
          <p className="text-sm text-gray-600 line-clamp-3 h-[120px]">
            {content.length > 300 ? (
              <>
                {content.slice(0, 330)}....
                <button
                  className="text-blue-100 hover:underline ml-1"
                  onClick={(e) => {
                    e.preventDefault();
                    openModal(); // Open modal on click
                  }}
                >
                  Read more
                </button>
              </>
            ) : (
              content
            )}
          </p>
        </div>

        {flagDelete ? (
          <div className="flex justify-between">
            <button onClick={deleteHandler}>
              <MdDelete className="w-10 h-6" />
            </button>
            <button>
              <FaRegEdit className="w-8 h-4" />
            </button>
          </div>
        ) : (
          <div className="flex justify-between">
            <div>
              <div className="text-xs text-gray-500 mt-4">{authorName}</div>
            </div>

            <div className="flex">
              <button className="flex" onClick={handler}>
                <img src={love} alt="" />
                {likes}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
     {isModalOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className=" p-6 rounded-lg shadow-[0_5px_15px_rgba(255,_255,_255,_0.5)] text-white bg-richblue-400 w-[90%] max-w-lg h-[70vh] relative overflow-hidden">
      <button
        onClick={closeModal}
        className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
      >
        ✖
      </button>
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <div className="overflow-y-auto h-[calc(70vh-100px)] pr-2">
        <p className="text-gray-700">{content}</p>
    </div>
    </div>
  </div>
)}

    </>
  );
};

export default PostCard;
