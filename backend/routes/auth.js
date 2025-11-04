import express from "express";
import { registerUser, loginUser, checkUserExists } from "../controller/auth.js";
import { checkPhone } from "../controller/otp.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/check-phone", checkPhone);
router.get("/user-exists", checkUserExists);

export default router;
