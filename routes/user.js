import express from "express";
import {
  getuser,
  getuserfriend,
  addremovefriend,
} from "../controllers/user.js";
import { verifytoken } from "../middleware/auth.js";

const router = express.Router();

router.get("/:id", verifytoken, getuser);
router.get("/:id/friends", verifytoken, getuserfriend);

router.patch("/:id/:friendid", verifytoken, addremovefriend);

export default router;
