// routes/payment.js
import express from "express";
import Razorpay from "razorpay";
import { authenticateUser } from "../middleware/auth.js";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID ,
  key_secret: process.env.RAZORPAY_KEY_SECRET ,
});

// Create order
router.post("/create-order", authenticateUser, async (req, res) => {
  const { amount } = req.body; // amount in paise (₹100 = 10000)
  if (!amount) {
    return res.status(400).json({ message: "Amount is required" });
  }

  try {
    const options = {
      amount: amount,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    console.error(err);

    res.status(500).json({ message: err.message });
  }
});

export default router;
