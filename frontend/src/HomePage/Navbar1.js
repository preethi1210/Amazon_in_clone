import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import amazonLogo from './images/amazonLogo.png';
import { CiLocationOn } from 'react-icons/ci';
import CategoryDropdown from './catalog/CategoryDropdown';
import LanguageSelector from './catalog/LanguageSelector';
import AccountDropdown from './catalog/AccountDropdown';
import CartIcon from './catalog/CartIcon';
import { Link } from "react-router-dom";

const Navbar1 = () => {
  const [selectedLang, setSelectedLang] = useState('en');
  const [showLangDropdown, setShowLangDropdown] = useState(false);

  return (
    <div className="text-white w-full">
      <div className="bg-gray-900 w-full p-0.5">
        <div className="flex items-center justify-between gap-0.5">

          {/* Logo */}
          <div className="border border-transparent hover:border-white rounded-sm transition duration-200 p-1 cursor-pointer">
            <img src={amazonLogo} alt="Amazon Logo" className="w-36 h-12" />
          </div>

          {/* Location */}
          <div className="flex items-center gap-1 border border-transparent hover:border-white rounded-sm transition duration-200 group px-2 py-1 cursor-pointer">
            <CiLocationOn className="text-xl" />
            <div className="text-sm leading-tight">
              <p className="text-gray-300">Delivering to Guntur 522509</p>
              <b className="text-white">Update location</b>
            </div>
          </div>

          {/* Search Bar */}
          <div className="px-2 flex-grow">
            <CategoryDropdown />
          </div>
      {/* Language dropdown hover box */}
      <div
        className="relative ml-4 z-50"
        onMouseEnter={() => setShowLangDropdown(true)}
        onMouseLeave={() => setShowLangDropdown(false)}
      >
        {/* Trigger area */}
        <div className="flex items-center gap-1 px-2 py-1 cursor-pointer rounded-sm border border-transparent hover:border-white transition">
          <img
            src="https://flagcdn.com/w40/in.png"
            alt="India Flag"
            className="w-5 h-4 object-cover"
          />
          <span className="text-xs">{selectedLang.toUpperCase()}</span>
          <FaChevronDown className="text-xs mt-0.5" />
        </div>

        {/* Dropdown appears inside the same hoverable div */}
        {showLangDropdown && (
          <>
            <div className="fixed inset-0 bg-black opacity-40 z-40 pointer-events-none" />
            <LanguageSelector
              selectedLang={selectedLang}
              setSelectedLang={setSelectedLang}
            />
          </>
        )}
      </div>

          {/* Account */}
          <div className="border border-transparent hover:border-white rounded-sm transition duration-200 group px-2">
            <AccountDropdown />
          </div>

          {/* Returns & Orders */}
          <div className="border border-transparent hover:border-white rounded-sm transition duration-200 group px-2 py-1 cursor-pointer">
            <span>Returns</span> <span className="font-bold">& Orders</span>
          </div>

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
