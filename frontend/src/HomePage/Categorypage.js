import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Product from "./Product";

const categoryMap = {
  "Fashion": ["Men's Fashion", "Women's Fashion"],
  "Mobiles": ["Mobiles, Computers"],
  "Electronics": ["TV, Appliances, Electronics", "Digital Content and Devices"],
};

const CategoryPage = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/products`);
        const data = await res.json();
  
        // ✅ Main category map
        const categoryMap = {
          "Fashion": ["Men's Fashion", "Women's Fashion"],
          "Mobiles": ["Mobiles, Computers"],
          "Electronics": ["TV, Appliances, Electronics", "Digital Content and Devices"],
          "New Releases": "new",
          "Todays Deals": "deals",
          "Bestsellers": "bestsellers",
        };
  
        // ✅ Subcategory map
        const subCategoryMap = {
          "Shoes": "Men's Fashion",
          "Casual Shirt": "Men's Fashion",
          "T-shirts": "Men's Fashion",
          "Jeans": "Men's Fashion",
          "Nike Sports Shoes": "Men's Fashion",
          "Adidas Sports Shoes": "Men's Fashion",
          "Summer Dress": "Women's Fashion",
          "Handbag": "Women's Fashion",
          "Winter Dress": "Women's Fashion",
          "Laptops": "Mobiles, Computers",
          "Tablets": "Mobiles, Computers",
          "Power Banks": "Mobiles, Computers",
          "Televisions": "TV, Appliances, Electronics",
          "Headphones": "TV, Appliances, Electronics",
          "Refrigerators": "TV, Appliances, Electronics",
          "Washing Machines": "TV, Appliances, Electronics",
          "Echo Dot": "Digital Content and Devices",
          "Fire TV Stick": "Digital Content and Devices",
          "Apple Watch Series 9": "Digital Content and Devices",
        };
  
        let filtered = [];
  
        // ✅ Check if it's a main category
        if (categoryMap[category]) {
          filtered = data.filter((p) => categoryMap[category].includes(p.category));
        }
        // ✅ Check if it's a subcategory
        else if (subCategoryMap[category]) {
          const mainCat = subCategoryMap[category];
          filtered = data.filter(
            (p) =>
              p.category === mainCat &&
              p.title.toLowerCase().includes(category.toLowerCase())
          );
        }
        // ✅ Otherwise exact match
        else {
          filtered = data.filter((p) => p.category === category);
        }
  
        setProducts(filtered);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchProducts();
  }, [category]);
  
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
