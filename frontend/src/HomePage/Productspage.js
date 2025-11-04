import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import Product from "./Product";

// Optional category mapping for special handling
const categoryMap = {
  Fashion: ["Men's Fashion", "Women's Fashion"],
  Mobiles: ["Mobile Phones", "Computers", "Mobiles & Accessories"],
  Electronics: ["Electronics", "TV, Appliances, Electronics", "Digital Content and Devices"],
  Bestsellers: "bestsellers",
  "Todays Deals": "deals",
  "New Releases": "new",
};

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const queryCategory = params.get("category") || "";
  const searchTerm = params.get("q") || "";

  const pathParams = useParams();
  const pathCategory = pathParams.categoryName || "";

  // Determine current category: path param > query param > default
  const category = pathCategory || queryCategory || "All categories";

  const navigate = useNavigate();

  // Fetch products from API
  const fetchProducts = async (cat = "All categories", search = "") => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/products");
      const data = await res.json();

      const filtered = data.filter((p) => {
        // Split product categories by comma and normalize
        const productCategories = p.category
          .split(",")
          .map((c) => c.toLowerCase().trim());

        // --- Category matching ---
        const categoryMatch =
          !cat ||
          cat.toLowerCase() === "all" ||
          cat.toLowerCase() === "all categories" ||
          productCategories.includes(cat.toLowerCase().trim());

        // --- Partial & multi-word search ---
        const searchWords = search
          .toLowerCase()
          .trim()
          .split(" ")
          .filter(Boolean);

        const searchMatch =
          searchWords.length === 0 ||
          searchWords.every((word) => p.title.toLowerCase().includes(word));

        return categoryMatch && searchMatch;
      });

      setProducts(filtered);
    } catch (err) {
      console.error("Error fetching products:", err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch on page load based on URL params
  useEffect(() => {
    fetchProducts(category, searchTerm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // only runs once; dropdown does NOT trigger this fetch

  // Hide category dropdown/sidebar on this page
  const showCategoryDropdown = false;

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      {/* Optional dropdown - hidden on page load */}
      {showCategoryDropdown && (
        <div className="mb-6">{/* Enable dropdown here if needed */}</div>
      )}

      {/* Products Grid */}
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
