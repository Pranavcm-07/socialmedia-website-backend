import express from "express";
import { login, signatureUpload } from "../controllers/auth.js";

const router = express.Router();

router.post("/login", login);
router.post("/signature", signatureUpload);

export default router;
