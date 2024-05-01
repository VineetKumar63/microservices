import express from 'express'
import { getPost, store } from '../controllers/postController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const PostRouter = express.Router();

PostRouter.post("/post/getPosts", getPost)
PostRouter.post("/post/storePosts", authMiddleware, store)

export default PostRouter