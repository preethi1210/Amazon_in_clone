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

  // Map main categories to DB categories
  const mainCategoryMap = {
    Fashion: ["men's fashion", "women's fashion", "fashion"],
    Mobiles: ["mobile phones", "mobiles & accessories", "mobiles", "computers"],
    Electronics: ["electronics", "tv, appliances, electronics", "digital content and devices"],
    "Bestsellers": ["bestsellers"],
    "Todays Deals": ["deals"],
    "New Releases": ["new"],
    "Home & Kitchen": ["home appliances", "kitchen", "furniture", "decor"],
  };

  // Optional: subcategories mapped to main categories
  const subCategoryMap = {
    "Shoes": "men's fashion",
    "Casual Shirt": "men's fashion",
    "T-shirts": "men's fashion",
    "Jeans": "men's fashion",
    "Nike Sports Shoes": "men's fashion",
    "Adidas Sports Shoes": "men's fashion",
    "Summer Dress": "women's fashion",
    "Handbag": "women's fashion",
    "Winter Dress": "women's fashion",
    "Laptops": "mobiles",
    "Tablets": "mobiles",
    "Power Banks": "mobiles",
    "Televisions": "tv, appliances, electronics",
    "Headphones": "tv, appliances, electronics",
    "Refrigerators": "tv, appliances, electronics",
    "Washing Machines": "tv, appliances, electronics",
    "Echo Dot": "digital content and devices",
    "Fire TV Stick": "digital content and devices",
    "Apple Watch Series 9": "digital content and devices",
  };

  const normalize = (str) => (str || "").toLowerCase().trim();

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/products`);
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();

      const currentCategory = categoryName || params.get("category") || "All categories";
      const mappedCategories = mainCategoryMap[currentCategory] || [normalize(currentCategory)];
      const searchWords = searchTerm.toLowerCase().split(" ").filter(Boolean);

      const filtered = data.filter((p) => {
        const productCategories = (p.category || "")
          .split(",")
          .map(normalize);

        // Category match: partial includes for flexibility
        const categoryMatch =
          currentCategory.toLowerCase() === "all categories" ||
          productCategories.some((pc) =>
            mappedCategories.some((mc) => pc.includes(mc) || mc.includes(pc))
          ) ||
          subCategoryMap[currentCategory]?.toLowerCase() === productCategories[0];

        // Search match
        const titleLower = (p.title || "").toLowerCase();
        const searchMatch =
          searchWords.length === 0 || searchWords.every((word) => titleLower.includes(word));

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
    fetchProducts();
  }, [categoryName, searchTerm]);

  if (loading)
    return (
      <p className="text-center text-xl text-gray-600 animate-pulse mt-10">
        Loading products...
      </p>
    );

  if (products.length === 0)
    return (
      <p className="text-center text-xl text-gray-600 mt-10">
        No products found for "{categoryName || 'All categories'}"
      </p>
    );

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
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
    </div>
  );
};

export default ProductsPage;
