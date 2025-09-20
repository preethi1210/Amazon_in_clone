import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/user.js";   // must end with .js in ESM
import authRoutes from "./routes/auth.js"; // make sure file name matches
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });   // 👈 tell dotenv where to look

const app = express();

const allowedOrigins = ["http://localhost:3000"];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.use(express.json());

// MongoDB connection
mongoose
  .connect("mongodb://localhost:27017/amazon")
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

// Routes
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

// Start server
app.listen(5000, () => console.log("🚀 Server running on port 5000"));
