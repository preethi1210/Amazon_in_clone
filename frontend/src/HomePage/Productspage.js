import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Product from "./Product";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const queryCategory = params.get("category") || "";
  const searchTerm = params.get("q") || "";

  const pathParams = useParams();
  const pathCategory = pathParams.categoryName || "";

  // Final category to filter
  const category = pathCategory || queryCategory || "All";

  const fetchProducts = async (cat = "All", search = "") => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/products`);
      if (!res.ok) throw new Error("Failed to fetch products");

      const data = await res.json();
      console.log("All products from API:", data);

      // Normalize search terms
      const searchWords = search
        .toLowerCase()
        .trim()
        .split(" ")
        .filter(Boolean);

      // Filter products
      const filtered = data.filter((p) => {
        const productCategories = (p.category || "")
          .split(",") // split if multiple categories
          .map((c) => c.toLowerCase().trim());

        const categoryMatch =
          cat.toLowerCase() === "all" || productCategories.includes(cat.toLowerCase().trim());

        const titleLower = (p.title || "").toLowerCase();

        // Match if all search words appear somewhere in the title
        const searchMatch =
          searchWords.length === 0 ||
          searchWords.every((word) => titleLower.includes(word));

        return categoryMatch && searchMatch;
      });

      console.log("Filtered products:", filtered);
      setProducts(filtered);
    } catch (err) {
      console.error("Error fetching products:", err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(category, searchTerm);
  }, [category, searchTerm]);

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      {loading ? (
        <p className="text-center text-xl text-gray-600 animate-pulse">
          Loading products...
        </p>
      ) : products.length === 0 ? (
        <p className="text-center text-xl text-gray-600">No products found</p>
      ) : (
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((p) => (
            <div
              key={p._id}
              className="transform transition-all hover:-translate-y-2 hover:scale-105 hover:shadow-xl bg-white p-4 rounded-2xl shadow-md"
            >
              <Product {...p} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
