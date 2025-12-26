import React, { useState, useRef, useEffect } from "react";
import { HiOutlineBars3 } from "react-icons/hi2";
import { FaChevronDown } from "react-icons/fa";
import suprise from "./images/suprise.avif";
import amazonblue from "./images/amazon_blue.png";
import All_categories from "./Sub_home/All_categories";
import { useNavigate, Link } from "react-router-dom";

const navItemClass =
  "border border-transparent hover:border-white px-2 py-1 rounded cursor-pointer whitespace-nowrap";

const Navbar2 = () => {
  const [showPrimeDropdown, setShowPrimeDropdown] = useState(false);
  const [showAllDropdown, setShowAllDropdown] = useState(false);
  const allDropdownRef = useRef(null);
  const primeTimeoutRef = useRef(null);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const name = localStorage.getItem("userName");
    setUserName(name || "");
  }, []);

  // Handle click outside for All dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (allDropdownRef.current && !allDropdownRef.current.contains(event.target)) {
        setShowAllDropdown(false);
      }
    };

    if (showAllDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showAllDropdown]);

  // Prime hover
  const handlePrimeEnter = () => {
    clearTimeout(primeTimeoutRef.current);
    setShowPrimeDropdown(true);
  };
  const handlePrimeLeave = () => {
    primeTimeoutRef.current = setTimeout(() => {
      setShowPrimeDropdown(false);
    }, 100);
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userIdentifier");
    localStorage.removeItem("userName");
    setUserName("");
    navigate("/login");
  };

  return (
    <div className="bg-gray-800 text-white w-full relative">
      {/* Dark overlay when All dropdown is open */}
      {showAllDropdown && <div className="fixed inset-0 bg-black opacity-50 z-40" />}

      <div className="flex items-center flex-wrap gap-3 text-sm px-4 py-2 relative z-50">
        {/* All Categories */}
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
        <Link to="/category/Fashion" className={navItemClass}>Fashion</Link>
<Link to="/category/Mobiles" className={navItemClass}>Mobiles</Link>
<Link to="/category/Bestsellers" className={navItemClass}>Bestsellers</Link>
<Link to="/category/Todays Deals" className={navItemClass}>Today's Deals</Link>
<Link to="/category/New Releases" className={navItemClass}>New Releases</Link>

        {/* Other Nav Items with Links */}
        <Link to="/sell" className={navItemClass}>
          Sell
        </Link>
        <Link to="/category/Home & Kitchen" className={navItemClass}>
          Home & Kitchen
        </Link>
        <Link to="/category/Electronics" className={navItemClass}>
          Electronics
        </Link>
        <Link to="/payment" className={navItemClass}>
          Amazon Pay
        </Link>
        <Link to="/category/Computers" className={navItemClass}>
          Computers
        </Link>

        {/* Prime Dropdown */}
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

        {/* User Section */}
        {userName ? (
          <button
            onClick={handleLogout}
            className="border px-2 py-1 rounded hover:bg-red-600"
          >
            Logout ({userName})
          </button>
        ) : (
          <Link to="/login" className={navItemClass}>
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar2;
