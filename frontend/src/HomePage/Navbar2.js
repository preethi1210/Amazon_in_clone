import React, { useState, useRef, useEffect } from 'react';
import { HiOutlineBars3 } from 'react-icons/hi2';
import { FaChevronDown } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa';
import suprise from './images/suprise.avif';
import amazonblue from './images/amazon_blue.png';
import All_categories from './Sub_home/All_categories';

const navItemClass =
  'border border-transparent hover:border-white px-2 py-1 rounded cursor-pointer whitespace-nowrap';

const Navbar2 = () => {
  const [showPrimeDropdown, setShowPrimeDropdown] = useState(false);
  const [showAllDropdown, setShowAllDropdown] = useState(false);
  const allDropdownRef = useRef(null);
  const primeTimeoutRef = useRef(null);

  // Handle click outside for All dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        allDropdownRef.current &&
        !allDropdownRef.current.contains(event.target)
      ) {
        setShowAllDropdown(false);
      }
    };

    if (showAllDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showAllDropdown]);

  // Handle Prime Hover
  const handlePrimeEnter = () => {
    clearTimeout(primeTimeoutRef.current);
    setShowPrimeDropdown(true);
  };

  const handlePrimeLeave = () => {
    primeTimeoutRef.current = setTimeout(() => {
      setShowPrimeDropdown(false);
    }, 100);
  };

  return (
    <div className="bg-gray-800 text-white w-full relative">
      {/* Dark overlay when All dropdown is open */}
      {showAllDropdown && (
        <div className="fixed inset-0 bg-black opacity-50 z-40" />
      )}

      <div className="flex items-center flex-wrap gap-3 text-sm px-4 py-2 relative z-50">
        {/* All - Click to open dropdown */}
        <div ref={allDropdownRef} className="relative">
          <div
            className={`${navItemClass} flex items-center gap-1`}
            onClick={() => setShowAllDropdown((prev) => !prev)}
          >
            <HiOutlineBars3 className="text-lg" />
            <span>All</span>
          </div>

          {showAllDropdown && (
            <div className="absolute left-0 top-full mt-2 z-50 shadow-xl border bg-white border-gray-300">
              <All_categories />
            </div>
          )}
        </div>

        <div className={navItemClass}>Sell</div>
        <div className={navItemClass}>Bestsellers</div>
        <div className={navItemClass}>Today's Deals</div>
        <div className={navItemClass}>Mobiles</div>

        {/* Prime - Hover to show dropdown */}
        <div
          className="relative z-50"
          onMouseEnter={handlePrimeEnter}
          onMouseLeave={handlePrimeLeave}
        >
          <div className={`${navItemClass} flex items-center gap-1`}>
            <span>Prime</span>
            <FaChevronDown className="text-sm" />
          </div>

          {showPrimeDropdown && (
            <>
              <div className="fixed inset-0 bg-black opacity-50 z-40 pointer-events-none" />
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
            </>
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
