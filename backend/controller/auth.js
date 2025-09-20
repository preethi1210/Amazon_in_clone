import User from "../model/user.js";
import generateToken from "../utils/generateToken.js";
import Otp from "../model/Otp.js";
import sendEmailOTP from "../utils/sendOTP.js";

// ✅ Email + Password Login/Register
export const emailAuth = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      // login
      const isMatch = await user.matchPassword(password);
      if (!isMatch) return res.status(401).json({ message: "Invalid password" });

      return res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        token: generateToken(user._id),
        message: "Login successful",
      });
    } else {
      // register
      user = await User.create({ name, email, password });

      return res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        token: generateToken(user._id),
        message: "User registered successfully",
      });
    }
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ✅ Phone OTP Login/Register
export const phoneAuth = async (req, res) => {
  const { uid, phoneNumber, name, email } = req.body;

  try {
    let user = await User.findOne({ phoneNumber });

    if (!user) {
      user = await User.create({
        uid,
        phoneNumber,
        name: name || "",
        email,
      });
    }

    // ✅ return ensures only ONE response is sent
    return res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      token: generateToken(user._id),
      message: "Phone login successful",
    });
  } catch (err) {
    console.error("Phone auth error:", err.message);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ✅ Send OTP to Email
export const sendOtpToEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await Otp.deleteMany({ email });
    await new Otp({ email, otp }).save();

    await sendEmailOTP(email, otp);
    res.json({ message: "OTP sent to email" });
  } catch (err) {
    res.status(500).json({ message: "Failed to send OTP", error: err.message });
  }
};

// ✅ Verify OTP (for email)
export const verifyEmailOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const record = await Otp.findOne({ email, otp });

    if (!record) return res.status(400).json({ message: "Invalid or expired OTP" });

    let user = await User.findOne({ email });
    if (user) {
      user.isVerified = true;
      await user.save();
    }

    res.json({ message: "Email verified successfully" });
  } catch (err) {
    res.status(500).json({ message: "OTP verification failed", error: err.message });
  }
};
