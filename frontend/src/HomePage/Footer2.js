import React, { useState } from 'react';
import { FaGlobe } from 'react-icons/fa';
import amazonLogo from "../HomePage/images/amazonLogo.png";
import LanguageSelector from './catalog/LanguageSelector';

const Footer2 = () => {
  // Manage selected language state here (you can lift state up if necessary)
  const [selectedLang, setSelectedLang] = useState('en');

  return (
    <div className="border border-white px-6 py-4 bg-gray-800 text-white text-sm">
      <div className="flex flex-wrap items-center justify-center gap-6 relative ">

        {/* Amazon Logo */}
        <img src={amazonLogo} alt="Amazon Logo" className="w-20 h-auto" />

        {/* Globe + English with Dropdown on Hover */}
        <div className="relative group flex items-center border-white  gap-2 cursor-pointer">
          <FaGlobe className="text-base" />
          <span>{selectedLang.toUpperCase()}</span>

          {/* LanguageSelector dropdown visible on group hover */}
          <LanguageSelector 
            selectedLang={selectedLang} 
            setSelectedLang={setSelectedLang} 
          />
        </div>

        {/* Country Info */}
<div className="relative group flex items-center border-white gap-2 cursor-pointer">
          <img
            src="https://flagcdn.com/w40/in.png"
            alt="India Flag"
            className="w-6 h-4 object-cover"
          />
          <span>India</span>
        </div>
      </div>
    </div>
  );
};

export default Footer2;
