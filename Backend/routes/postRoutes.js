const express = require('express');
const router = express.Router();
const {createPost, deletePost, getAllPost, getPost, getUserPosts, liked} = require('../controllers/postController')
const {authenticate} = require("../middlewares/authenticate")


router.post('/create', authenticate, createPost);

router.delete('/delete/:postId', authenticate, deletePost);

router.get('/post/:postId',authenticate, getPost)

router.post('/like/:postId',authenticate, liked)

router.get('/posts',authenticate, getAllPost)

router.get('/userPost', authenticate, getUserPosts);

module.exports = router;