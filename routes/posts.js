import express from "express";
import {
  getFeedPosts,
  getUserPosts,
  likePost,
  getComments,
  addComments,
} from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);
router.get("/:id/get/comments", verifyToken, getComments);

/* UPDATE */
router.patch("/:id/like", verifyToken, likePost);
router.post("/:id/comments", verifyToken, addComments);

export default router;
