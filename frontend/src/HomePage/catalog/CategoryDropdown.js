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

const CategoryDropdown = ({ onSearch }) => {
  const [showCategories, setShowCategories] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const toggleCategories = () => setShowCategories(prev => !prev);

  const handleSelect = (category) => {
    setSelectedCategory(category);
    setShowCategories(false);
    onSearch?.(category, searchTerm);
  };

  const handleInputChange = (e) => setSearchTerm(e.target.value);

  const handleSearch = () => {
    onSearch?.(selectedCategory, searchTerm);
  };

  return (
    <div className="relative w-full max-w-3xl">
      <div className="flex w-full h-11 overflow-hidden rounded-lg shadow-md border-4 border-transparent focus-within:border-orange-500 transition duration-150 bg-white">
        {/* Category button */}
        <div
          className="flex items-center gap-1 px-4 bg-gray-200 text-gray-700 text-sm font-semibold cursor-pointer hover:bg-gray-300 select-none rounded-l-lg"
          onClick={toggleCategories}
        >
          <span>{selectedCategory}</span>
          <FaChevronDown className="text-xs mt-0.5" />
        </div>

        {/* Search input */}
        <input
          type="text"
          placeholder="Search for products..."
          className="flex-1 px-4 outline-none text-sm text-gray-800 bg-white"
          value={searchTerm}
          onChange={handleInputChange}
        />

        {/* Search button */}
        <div
          className="flex items-center justify-center bg-orange-400 px-4 cursor-pointer hover:bg-orange-500 rounded-r-lg"
          onClick={handleSearch}
        >
          <CiSearch className="text-white text-xl" />
        </div>
      </div>

      {/* Dropdown menu */}
      {showCategories && (
  <>
    {/* Overlay prevents any clicks in page while dropdown is open */}
    <div className="fixed inset-0 bg-transparent z-[999]" onClick={() => setShowCategories(false)} />
    <div
      className="absolute top-full left-0 mt-2 w-44 max-h-72 overflow-y-auto bg-white border border-gray-200 shadow-lg rounded-lg z-[1000]"
      style={{ background: "white" }}
      onClick={e => e.stopPropagation()}
    >
      <ul className="text-sm font-medium text-gray-700">
        {amazon.search.map((category, index) => (
          <li
            key={index}
            onClick={() => handleSelect(category)}
            className="px-4 py-2 hover:bg-orange-500 hover:text-white cursor-pointer transition"
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  </>
)}
    </div>
  );
};

export default CategoryDropdown;
