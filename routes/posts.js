import express from "express";
import { getfeedpost, getuserpost, likepost } from "../controllers/posts.js";
import { verifytoken } from "../middleware/auth.js";

const router = express.Router();

router.get("/", verifytoken, getfeedpost);

router.get("/:userid/posts", verifytoken, getuserpost);

router.patch("/:id/like", verifytoken, likepost);

export default router;
