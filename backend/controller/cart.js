// controllers/cartController.js
import Cart from "../model/Cart.js";

// Get cart
export const getCart = async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user.id }).populate("items.productId");
  res.json(cart || { items: [] });
};

// Add to cart
export const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  let cart = await Cart.findOne({ userId: req.user.id });
  if (!cart) cart = new Cart({ userId: req.user.id, items: [] });

  const itemIndex = cart.items.findIndex(item => item.productId == productId);
  if (itemIndex > -1) cart.items[itemIndex].quantity += quantity;
  else cart.items.push({ productId, quantity });

  await cart.save();
  res.json(cart);
};

// Update quantity
export const updateCart = async (req, res) => {
  const { productId, quantity } = req.body;
  let cart = await Cart.findOne({ userId: req.user.id });
  if (!cart) return res.status(404).json({ message: "Cart not found" });

  const item = cart.items.find(i => i.productId == productId);
  if (item) item.quantity = quantity;

  cart = await cart.save();
  await cart.populate("items.productId"); // populate products
  res.json(cart); // send full cart
};

// Remove item
export const removeFromCart = async (req, res) => {
  let cart = await Cart.findOne({ userId: req.user.id });
  if (!cart) return res.status(404).json({ message: "Cart not found" });

  cart.items = cart.items.filter(i => i.productId != req.params.productId);

  cart = await cart.save();
  await cart.populate("items.productId"); // populate products
  res.json(cart); // send full cart
};
