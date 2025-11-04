// controller/otp.js
import User from "../model/user.js";

export const checkPhone = async (req, res) => {
  try {
    const { phone } = req.body;
    if (!phone) return res.status(400).json({ message: "Phone required" });

    const user = await User.findOne({ phone });
    res.json({ exists: !!user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
