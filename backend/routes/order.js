// routes/order.js
import express from "express";
import { authenticateUser } from "../middleware/auth.js";
import { getOrders, createOrder } from "../controller/order.js";

const router = express.Router();
router.get("/", authenticateUser, getOrders);
router.post("/create", authenticateUser, createOrder);
export default router;
