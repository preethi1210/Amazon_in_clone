// controller/productController.js
import Product from "../model/product.js";

// Get all products or by category
export const getProducts = async (req, res) => {
  const { category } = req.query; // optional query param
  try {
    let products;
    if (category) {
      products = await Product.find({ category });
    } else {
      products = await Product.find({});
    }
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Create a new product
export const createProduct = async (req, res) => {
  try {
    const { title, price, rating, image, category } = req.body;
    const product = new Product({ title, price, rating, image, category });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
