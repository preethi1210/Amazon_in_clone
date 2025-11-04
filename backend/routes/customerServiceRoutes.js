import express from "express";
import { authenticateUser as protect } from "../middleware/auth.js";
const router = express.Router();

// Sample customer service routes
router.get("/", protect, (req, res) => {
  res.json({
    message: "Welcome to Customer Service Center",
    options: [
      "Order related queries",
      "Payment issues",
      "Return / Refunds",
      "Account support",
    ],
    contactEmail: "support@shopzone.com",
  });
});

router.post("/contact", protect, (req, res) => {
  const { subject, message } = req.body;

  if (!subject || !message)
    return res.status(400).json({ message: "Please provide all fields." });

  // In real apps, save to DB or send an email
  res.json({
    success: true,
    message: "Your query has been received. Our team will reach out soon!",
  });
});

export default router;
