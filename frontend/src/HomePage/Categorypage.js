import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import Product from "./Product";

const CategoryPage = () => {
  const { category: pathCategory } = useParams();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const queryCategory = params.get("category") || "";
  const searchTerm = params.get("q") || "";

  const category = pathCategory || queryCategory || "All categories";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Main category map
  const mainCategoryMap = {
    Fashion: ["men's fashion", "women's fashion"],
Mobiles: ["mobile phones", "computers", "mobiles & accessories", "mobiles"],
    Electronics: ["electronics", "tv, appliances, electronics", "digital content and devices"],
    "Bestsellers": ["bestsellers"],
    "Todays Deals": ["deals"],
    "New Releases": ["new"],
  };

  // Subcategory map (optional)
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
      // Fetch all products
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/products`);
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();

      // Filter products locally
      const filtered = data.filter((p) => {
        const productCategory = normalize(p.category);
        const title = normalize(p.title);

        let categoryMatch = false;

        if (category.toLowerCase() === "all categories") {
          categoryMatch = true;
        } else if (mainCategoryMap[category]) {
          const mappedCats = mainCategoryMap[category].map(normalize);
          categoryMatch = mappedCats.includes(productCategory);
        } else if (subCategoryMap[category]) {
          categoryMatch = normalize(subCategoryMap[category]) === productCategory;
        } else {
          categoryMatch = category.toLowerCase() === productCategory;
        }

        const searchWords = searchTerm
          .toLowerCase()
          .split(" ")
          .filter(Boolean);
        const searchMatch =
          searchWords.length === 0 || searchWords.every((word) => title.includes(word));

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
  }, [category, searchTerm]);

  if (loading) return <p>Loading products...</p>;
  if (products.length === 0) return <p>No products found for "{category}"</p>;

  return (
    <div className="p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {products.map((p) => (
        <Product key={p._id} {...p} />
      ))}
    </div>
  );
};

export default CategoryPage;
