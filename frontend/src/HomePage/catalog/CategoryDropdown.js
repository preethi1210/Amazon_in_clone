import React, { useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { FaChevronDown } from 'react-icons/fa';

const amazon = {
  search: [
    'All categories',
    'Electronics',
    'Clothing',
    'Home',
    'Books',
    'Appliances',
    'Toys',
    'Mobiles',
    'Groceries',
    'Fashion',
    'Beauty'
  ]
};

const CategoryDropdown = () => {
  const [showCategories, setShowCategories] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const toggleCategories = () => setShowCategories(prev => !prev);

  const handleSelect = (category) => {
    setSelectedCategory(category);
    setShowCategories(false);
  };

  return (
    <div className="relative w-full max-w-3xl">
      {/* Wrap with border + focus-within to highlight entire group */}
<div className="flex w-full h-10 overflow-hidden rounded-lg shadow-sm border-4 border-transparent focus-within:border-orange-900 transition duration-200">
        
        {/* Left: Category dropdown trigger */}
        <div
          className="flex items-center gap-1 px-3 bg-gray-200 text-gray-700 text-sm cursor-pointer hover:bg-gray-300"
          onClick={toggleCategories}
        >
          <span>{selectedCategory}</span>
          <FaChevronDown className="text-xs mt-0.5" />
        </div>

        {/* Middle: Search input */}
        <input
          type="text"
          placeholder="Search for products..."
          className="flex-1 px-4 outline-none text-sm text-gray-700 bg-white"
        />

        {/* Right: Search icon */}
        <div className="flex items-center justify-center bg-orange-300 px-3 cursor-pointer">
          <CiSearch className="text-white text-xl" />
        </div>
      </div>

      {/* Dropdown list */}
      {showCategories && (
        <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 shadow-md rounded-sm z-10 w-40 max-h-60 overflow-y-auto">
          <ul className="text-sm text-gray-700">
            {amazon.search.map((category, index) => (
              <li
                key={index}
                onClick={() => handleSelect(category)}
                className="px-4 py-2 hover:bg-blue-500 hover:text-white cursor-pointer"
              >
                {category}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CategoryDropdown;
