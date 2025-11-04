// routes/cart.js
import express from "express";
import { authenticateUser } from "../middleware/auth.js";
import { getCart, addToCart, updateCart, removeFromCart } from "../controller/cart.js";

const router = express.Router();
router.get("/", authenticateUser, getCart);
router.post("/add", authenticateUser, addToCart);
router.put("/update", authenticateUser, updateCart);
router.delete("/remove/:productId", authenticateUser, removeFromCart);
export default router;
