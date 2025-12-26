import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import Product from "./Product";

const ProductsPage = () => {
  const { categoryName } = useParams(); // from URL: /category/:categoryName
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const searchTerm = params.get("q") || "";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Map URL-friendly category names to actual product categories
  const categoryMap = {
    Fashion: ["men's fashion", "women's fashion"],
    Mobiles: ["mobile phones", "computers", "mobiles & accessories"],
    Electronics: ["electronics", "tv, appliances, electronics", "digital content and devices"],
    "Bestsellers": ["bestsellers"],
    "Todays Deals": ["deals"],
    "New Releases": ["new"],
    "Home & Kitchen": ["home appliances", "kitchen", "furniture", "decor"], // example
  };

  const normalize = (str) => (str || "").toLowerCase().trim();

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(${process.env.REACT_APP_API_BASE_URL}/products);
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();

      const finalCategory = categoryName || "All categories";
      const mappedCategories = categoryMap[finalCategory] || [normalize(finalCategory)];
      const searchWords = searchTerm.toLowerCase().split(" ").filter(Boolean);

      const filtered = data.filter((p) => {
        const productCategories = (p.category || "")
          .split(",")
          .map(normalize);

        const categoryMatch =
          finalCategory.toLowerCase() === "all categories" ||
          productCategories.some((pc) => mappedCategories.includes(pc));

        const titleLower = (p.title || "").toLowerCase();
        const searchMatch =
          searchWords.length === 0 ||
          searchWords.every((word) => titleLower.includes(word));

        return categoryMatch && searchMatch;
      });

      setProducts(filtered);
    } catch (err) {
      console.error(err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [categoryName, searchTerm]);

  if (loading)
    return <p className="text-center mt-10 text-lg">Loading products...</p>;
  if (products.length === 0)
    return (
      <p className="text-center mt-10 text-lg">
        No products found for "{categoryName || 'All categories'}"
      </p>
    );

  return (
    <div className="p-6 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products.map((p) => (
        <Product key={p._id} {...p} />
      ))}
    </div>
  );
};

export default ProductsPage;
