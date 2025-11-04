// model/product.js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    rating: { type: Number, default: 0 },
    image: { type: String, required: true },
    category: { type: String, required: true } // add category
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
