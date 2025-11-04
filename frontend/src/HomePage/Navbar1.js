import React, { useState, useEffect } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import amazonLogo from './images/amazonLogo.png';
import { CiLocationOn } from 'react-icons/ci';
import CategoryDropdown from './catalog/CategoryDropdown';
import LanguageSelector from './catalog/LanguageSelector';
import AccountDropdown from './catalog/AccountDropdown';
import CartIcon from './catalog/CartIcon';
import { Link, useNavigate } from "react-router-dom";
import LocationSelector from "./LocationSelector";

const Navbar1 = () => {
  const [selectedLang, setSelectedLang] = useState('en');
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const name = localStorage.getItem("userName");
    if (name) setUserName(name);
  }, []);
  const handleSearch = (category, searchTerm) => {
    // Navigate to products page with query params
    navigate(`/products?category=${encodeURIComponent(category)}&q=${encodeURIComponent(searchTerm)}`);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userIdentifier");
    localStorage.removeItem("userName");
    setUserName("");
    navigate("/login");
  };

  return (
    <div className="text-white w-full">
      <div className="bg-gray-900 w-full p-0.5">
        <div className="flex items-center justify-between gap-0.5">

          {/* Logo */}
          <div className="border border-transparent hover:border-white rounded-sm transition duration-200 p-1 cursor-pointer">
            <Link to="/"><img src={amazonLogo} alt="Amazon Logo" className="w-36 h-12" /></Link>
          </div>

          {/* Location */}
          <LocationSelector />


          {/* Search Bar */}
          <CategoryDropdown onSearch={handleSearch} />


          {/* Language dropdown hover box */}
          <div
            className="relative ml-4 z-50"
            onMouseEnter={() => setShowLangDropdown(true)}
            onMouseLeave={() => setShowLangDropdown(false)}
          >
            <div className="flex items-center gap-1 px-2 py-1 cursor-pointer rounded-sm border border-transparent hover:border-white transition">
              <img src="https://flagcdn.com/w40/in.png" alt="India Flag" className="w-5 h-4 object-cover" />
              <span className="text-xs">{selectedLang.toUpperCase()}</span>
              <FaChevronDown className="text-xs mt-0.5" />
            </div>
            {showLangDropdown && (
              <>
                <div className="fixed inset-0 bg-black opacity-40 z-40 pointer-events-none" />
                <LanguageSelector selectedLang={selectedLang} setSelectedLang={setSelectedLang} />
              </>
            )}
          </div>

          {/* Account */}
{/* Account Section */}
<div className="relative border border-transparent hover:border-white rounded-sm transition duration-200 group px-2">
  {userName ? (
    <div className="relative">
      <span className="cursor-pointer">Hello, {userName}</span>

      {/* Dropdown */}
      
    </div>
  ) : (
    <AccountDropdown />
  )}
</div>

          {/* Returns & Orders */}
          <div className="border border-transparent hover:border-white rounded-sm transition duration-200 group px-2 py-1 cursor-pointer">
            <Link to="/orders" className="flex flex-col text-sm">
              <span>Returns</span> <span className="font-bold">& Orders</span>
            </Link>
          </div>

          {/* Cart */}
          <div className="px-2">
            <Link to="/cart">
              <CartIcon />
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Navbar1;
