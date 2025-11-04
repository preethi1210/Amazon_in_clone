// controllers/authController.js
import User from "../model/user.js";
import generateToken from "../utils/generateToken.js";

// ✅ Register (supports email or phone)
export const registerUser = async (req, res) => {
  const { name, email, phone, password } = req.body;

  try {
    // At least one of email or phone required
    if (!email && !phone) {
      return res.status(400).json({ message: "Email or phone number required" });
    }

    // Check if already exists (email or phone)
    let existingUser = await User.findOne({
      $or: [{ email }, { phone }]
    });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    const user = await User.create({ name, email, phone, password });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      token: generateToken(user._id),
      message: "User registered successfully",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Login (by email or phone)
export const loginUser = async (req, res) => {
  const { email, phone, password } = req.body;

  try {
    // Find by email OR phone
    const user = await User.findOne({
      $or: [{ email }, { phone }]
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      token: generateToken(user._id),
      message: "Login successful",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// ✅ Check if user exists by email or phone
export const checkUserExists = async (req, res) => {
  try {
    const { email, phone } = req.query;
    if (!email && !phone)
      return res.status(400).json({ message: "Email or phone required" });

    const query = email ? { email } : { phone };
    const user = await User.findOne(query);

    if (user) {
      res.json({
        exists: true,
        name: user.name,
        message: "User already exists",
      });
    } else {
      res.json({
        exists: false,
        message: "User not found",
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
