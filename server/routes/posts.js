import express from "express";
import {
  createPost,
  deletePost,
  getPosts,
  likePost,
  updatePost,
  getPostsBySearch,
  getPost,
  commentPost
} from "../controllers/posts.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router
  .get("/", getPosts)
  .post("/", auth, createPost)
  .patch("/:id", auth, updatePost)
  .delete("/:id", auth, deletePost)
  .patch("/:id/likePost", auth, likePost)
  .get('/search', getPostsBySearch)
  .get('/:id',getPost)
  .post('/:id/commentPost', auth, commentPost)

export default router;
