// routes/product.js
import express from "express";
import { getProducts,createProduct } from "../controller/product.js";

const router = express.Router();
router.get("/", getProducts);
router.post("/", createProduct);

export default router;