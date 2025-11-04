// controllers/userController.js
import User from "../model/user.js";

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Basic info
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;

    // Address info
    user.address.street = req.body.address?.street || user.address.street;
    user.address.city = req.body.address?.city || user.address.city;
    user.address.state = req.body.address?.state || user.address.state;
    user.address.postcode = req.body.address?.postcode || user.address.postcode;
    user.address.country = req.body.address?.country || user.address.country;

    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
