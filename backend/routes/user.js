// routes/user.js
import express from "express";
import { getProfile, updateProfile } from "../controller/user.js";
import { authenticateUser } from "../middleware/auth.js";

const router = express.Router();
router.get("/profile", authenticateUser, getProfile);
router.put("/profile", authenticateUser, updateProfile);
export default router;
