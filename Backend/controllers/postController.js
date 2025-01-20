const User = require('../models/User');
const Post = require('../models/Post');
require('dotenv').config();

// Create Post
exports.createPost = async (req, res) => {
    try {
        const userId = req.user.id;
        
        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required',
            });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }


        const post = await Post.create({
            title,
            content,
            author: user._id,
            authorName : user.name,
            createdAt: Date.now(),
        });

        // Add post to user's posts array
        await User.findByIdAndUpdate(
            userId,
            {
                $push: { posts: post._id },
            },
            { new: true }
        );

        return res.status(201).json({
            success: true,
            data: post,
            message: 'Post created successfully',
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Failed to create post',
        });
    }
};

// Delete Post
exports.deletePost = async (req, res) => {
    try {
        const postId = req.params.postId;

        // Find the post by ID
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({
                success: false,
                message: 'Post not found',
            });
        }

        const userId = post.author;

        // Remove post from user's posts array
        await User.findByIdAndUpdate(
            userId,
            {
                $pull: { posts: postId },
            },
            { new: true }
        );

        // Delete the post from the posts collection
        await Post.findByIdAndDelete(postId);

        return res.status(200).json({
            success: true,
            message: 'Post deleted successfully',
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Failed to delete post',
        });
    }
};

exports.getPost = async (req, res) => {
    try {
        const { postId } = req.params; // Use req.params for GET request

        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found",
            });
        }

        return res.status(200).json({
            success: true,
            post,
            message: "Post is found",
        });
    } catch (error) {
        console.error(error); // Log the error
        return res.status(500).json({
            success: false,
            message: "Error fetching post",
        });
    }
};


exports.getAllPost = async (req, res) => {
    try {
        const posts = await Post.find();

        // Check if the posts array is empty
        if (posts.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No posts found",
            });
        }

        return res.status(200).json({
            success: true,
            posts,
            message: "Posts are found",
        });
    } catch (error) {
        console.error(error); // Log the error
        return res.status(500).json({
            success: false,
            message: "Error fetching posts",
        });
    }
};


exports.getUserPosts = async (req, res) => {
    try {
        const userId = req.user.id

        const userPosts = await Post.find({ author: userId }).sort({ createdAt: -1 });

        if (userPosts.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No posts found for this user",
            });
        }

        return res.status(200).json({
            success: true,
            posts : userPosts,
            message : "User Posts"
        });

    } catch (error) {
        console.error(error);  // Log the error
        return res.status(500).json({
            success: false,
            message: "Error fetching posts",
        });
    }
};

exports.liked = async (req, res) => {
    try {
      const { postId } = req.params;
      const userId = req.user.id; 
  
      const post = await Post.findById(postId);
  
      if (!post) {
        return res.status(404).json({
          success: false,
          message: "Post not found",
        });
      }
  
      // Check if user has already liked the post
      if (post.likes.includes(userId)) {
        // Remove user from likes array (unlike functionality)
        post.likes = post.likes.filter((id) => id.toString() !== userId.toString());
        await post.save();
  
        return res.status(200).json({
          success: true,
          likes: post.likes.length,
          message: "Post unliked",
        });
      }
  
      // Add user to likes array
      post.likes.push(userId);
      await post.save();
  
      return res.status(200).json({
        success: true,
        likes: post.likes.length,
        message: "Post liked",
      });
    } catch (error) {
      console.error("Error liking post:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to like post",
      });
    }
  };
  
  