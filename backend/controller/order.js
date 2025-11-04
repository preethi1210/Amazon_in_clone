// controllers/orderController.js
import Order from "../model/order.js";

// Get orders
export const getOrders = async (req, res) => {
  const orders = await Order.find({ userId: req.user.id })
    .populate("items.productId")
    .sort({ created: -1 });
  res.json(orders);
};

// Create order
export const createOrder = async (req, res) => {
  const { items, amount } = req.body;
  const order = new Order({ userId: req.user.id, items, amount });
  await order.save();
  res.status(201).json(order);
};
