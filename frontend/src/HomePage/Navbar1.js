import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import amazonLogo from './images/amazonLogo.png';
import { CiLocationOn } from 'react-icons/ci';
import CategoryDropdown from './catalog/CategoryDropdown';
import LanguageSelector from './catalog/LanguageSelector';
import AccountDropdown from './catalog/AccountDropdown';
import CartIcon from './catalog/CartIcon';

const Navbar1 = () => {
  const [selectedLang, setSelectedLang] = useState('en'); // Default language code

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

          {/* Language Selector - uses group for hover */}
          <div className="group relative border border-transparent hover:border-white rounded-sm transition duration-200 px-2">
            <div className="flex items-center gap-1 px-2 py-1 cursor-pointer rounded-sm">
              <img
                src="https://flagcdn.com/w40/in.png"
                alt="India Flag"
                className="w-5 h-4 object-cover"
              />
              <span className="text-xs text-white">{selectedLang.toUpperCase()}</span>
              <FaChevronDown className="text-white text-xs mt-0.5" />
            </div>

            {/* Dropdown visible only on hover */}
            <LanguageSelector
              selectedLang={selectedLang}
              setSelectedLang={setSelectedLang}
            />
          </div>

          {/* Account */}
          <div className="border border-transparent hover:border-white rounded-sm transition duration-200 group px-2">
            <AccountDropdown />
          </div>

          {/* Returns & Orders */}
          <div className="border border-transparent hover:border-white rounded-sm transition duration-200 group px-2 py-1 cursor-pointer">
            <span>Returns</span> <span className="font-bold">& Orders</span>
          </div>

          {/* Cart */}
          <div className="px-2">
            <CartIcon />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Navbar1;
