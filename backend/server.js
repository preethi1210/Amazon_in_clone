// server.js
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, ".env") });
import express from "express";
import mongoose from "mongoose";
import customerServiceRoutes from "./routes/customerServiceRoutes.js";

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import productRoutes from "./routes/product.js";
import cartRoutes from "./routes/cart.js";
import orderRoutes from "./routes/order.js";
import paymentsRoutes from "./routes/payment.js";

const app = express();
console.log("✅ Loaded MONGO_URI:", process.env.MONGO_URI);

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB error:", err));
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payment", paymentsRoutes);
app.use("/api/customer-service", customerServiceRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
