import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaChevronDown } from "react-icons/fa";

const categories = [
  "All categories",
  "Fashion",
  "Mobiles",
  "Electronics",
  "Home & Kitchen",
  "Bestsellers",
  "Todays Deals",
  "New Releases",
];

const CategoryDropdown = ({ onSearch }) => {
  const [selectedCategory, setSelectedCategory] = useState("All categories");
  const [searchTerm, setSearchTerm] = useState("");
  const [showCategories, setShowCategories] = useState(false);

  const handleSelect = (category) => {
    setSelectedCategory(category);
    setShowCategories(false);
  };

  const handleSearch = () => {
    onSearch(selectedCategory, searchTerm);
  };

  return (
    <div className="relative w-full max-w-3xl">
      <div className="flex border rounded-lg overflow-hidden">
        <div
          className="flex items-center gap-1 px-3 bg-gray-900 cursor-pointer"
          onClick={() => setShowCategories((prev) => !prev)}
        >
          <span>{selectedCategory}</span>
          <FaChevronDown />
        </div>
        <input
          type="text"
          placeholder="Search products..."
          className="flex-1 px-3 outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="bg-orange-500 px-3 hover:bg-orange-600 text-gray-900"
          onClick={handleSearch}
        >
          <CiSearch />
        </button>
      </div>

      {showCategories && (
        <div className="absolute top-full left-0 mt-1 w-full bg-white border shadow-lg z-50">
          {categories.map((cat) => (
            <div
              key={cat}
              className="px-3 py-2 cursor-pointer hover:bg-orange-500 hover:text-white"
              onClick={() => handleSelect(cat)}
            >
              {cat}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryDropdown;
