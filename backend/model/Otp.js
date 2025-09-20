// models/otp.js
import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  email: { type: String },
  phone: { type: String },
  otp: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300, // auto-delete after 5 min
  },
});

const Otp = mongoose.model("Otp", otpSchema);
export default Otp;
