import express from "express";
import {
  createPost,
  deletePost,
  getPosts,
  updatePost,
  likePost
} from "../controllers/posts.js";
const router = express.Router();

router
  .get("/", getPosts)
  .post("/", createPost)
  .patch("/:id", updatePost)
  .delete("/:id", deletePost)
  .patch('/:id/likePost', likePost)

export default router;
