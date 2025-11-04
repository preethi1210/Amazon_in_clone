// routes/otp.js
import express from "express";
import Otp from "../model/Otp.js";

const router = express.Router();

// Send OTP
router.post("/send", async (req, res) => {
  const { phone } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  try {
    await Otp.create({ phone, otp });
    // send OTP via SMS here (Twilio/Firebase)
    res.json({ success: true, otp });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Verify OTP
router.post("/verify", async (req, res) => {
  const { phone, otp } = req.body;
  try {
    const record = await Otp.findOne({ phone, otp });
    if (!record) return res.status(400).json({ success: false, message: "Invalid OTP" });
    // Delete OTP after verification
    await Otp.deleteOne({ _id: record._id });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
