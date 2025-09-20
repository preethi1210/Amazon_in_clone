import express from "express";
import { emailAuth, phoneAuth } from "../controller/auth.js";  // ✅ import controllers
import Otp from "../model/Otp.js";
import User from "../model/user.js";
import generateToken from "../utils/generateToken.js"; // ✅ import token util
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

// 🔹 Email login/register
router.post("/login", emailAuth);

// 🔹 Check phone before registration
router.post("/check-phone", async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    if (!phoneNumber) return res.status(400).json({ message: "Phone number required" });

    const user = await User.findOne({ phoneNumber });

    if (user && user.isVerified) {
      return res.json({ exists: true });
    } else {
      return res.json({ exists: false });
    }
  } catch (err) {
    console.error("Check phone error:", err);
    res.status(500).json({ message: err.message });
  }
});

// 🔹 Phone login/register with OTP
router.post("/phone", async (req, res) => {
  try {
    const { uid, phoneNumber, email, name } = req.body;
    if (!phoneNumber) return res.status(400).json({ message: "Phone number required" });

    let user = await User.findOne({ phoneNumber });

    if (!user) {
            const newUid = uid || uuidv4();

      // Create new user
      user = new User({
        uid: newUid,
        phoneNumber,
               email: email || "",
        name: name || "",

        isVerified: true,
      });
      await user.save();
      
      console.log("Created new user:", user);
      console.log("JWT_SECRET in backend:", process.env.JWT_SECRET);

        const token = generateToken(user);
    res.json({ token });

    } else if (!user.isVerified) {
      // Update verification
      user.isVerified = true;
      await user.save();
      console.log("Updated user verification:", user);
    } else {
      console.log("User already verified:", user);
    }

    // ✅ Generate JWT token
    const token = generateToken(user._id);
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      token,
      message: "Phone login successful",
    });
  } catch (err) {
    console.error("Phone auth error:", err);
    res.status(500).json({ message: err.message });
  }
});

export default router;
