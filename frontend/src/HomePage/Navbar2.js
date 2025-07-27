import React, { useState, useRef } from 'react';
import { HiOutlineBars3 } from 'react-icons/hi2';
import { FaChevronDown } from 'react-icons/fa';
import suprise from './images/suprise.avif';
import amazonblue from './images/amazon_blue.png';

const navItemClass =
  'border border-transparent hover:border-white px-2 py-1 rounded cursor-pointer whitespace-nowrap';

const Navbar2 = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const timeoutRef = useRef(null);

  const handleEnter = () => {
    clearTimeout(timeoutRef.current);
    setShowDropdown(true);
  };

  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setShowDropdown(false);
    }, 100); // Small delay to avoid flicker
  };

  return (
    <div className="bg-gray-800 text-white w-full relative">
      <div className="flex items-center space-x-3 text-sm px-2 py-2 min-w-max relative z-10">
        {/* All */}
        <div className={`${navItemClass} flex items-center gap-1`}>
          <HiOutlineBars3 className="text-lg" />
          <span>All</span>
        </div>

        <div className={navItemClass}>Sell</div>
        <div className={navItemClass}>Bestsellers</div>
        <div className={navItemClass}>Today's Deals</div>
        <div className={navItemClass}>Mobiles</div>

        {/* Prime with hover control */}
        <div
          className="relative z-50"
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
        >
          <div className={`${navItemClass} flex items-center gap-1`}>
            <span>Prime</span>
            <FaChevronDown className="text-sm" />
          </div>

          {/* Dark background when dropdown open */}
          {showDropdown && (
            <div className="fixed inset-0 bg-black opacity-50 z-40 pointer-events-none" />
          )}

          {/* Dropdown box */}
          {showDropdown && (
            <div className="absolute top-full left-0 mt-2 w-[450px] bg-white text-black rounded-md shadow-md p-4 z-50 flex flex-col items-center">
              <h1 className="text-2xl font-bold text-center mb-1">
                Shopping plans starting at ₹399/year
              </h1>
              <h4 className="text-sm text-gray-700 text-center mb-4">
                Get FREE same/1-day delivery, Prime offers & more
              </h4>
              <img
                src={suprise}
                alt="Surprise"
                className="w-45 h-auto object-contain mb-4"
              />
              <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 rounded mb-2">
                Join Now
              </button>
              <div className="w-full flex justify-end">
                <img
                  src={amazonblue}
                  alt="Prime Logo"
                  className="w-20 p-0 h-20"
                />
              </div>
            </div>
          )}
        </div>

        <div className={navItemClass}>Customer Service</div>
        <div className={navItemClass}>Fashion</div>
        <div className={navItemClass}>New Releases</div>
        <div className={navItemClass}>Home & Kitchen</div>
        <div className={navItemClass}>Electronics</div>
        <div className={navItemClass}>Amazon Pay</div>
        <div className={navItemClass}>Computers</div>
      </div>
    </div>
  );
};

export default Navbar2;
