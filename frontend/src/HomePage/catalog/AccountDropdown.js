import React, { useState, useRef, useEffect } from 'react';
import SignInPanel from '../SignInPanel';
import ListSection from '../ListSection';

const AccountDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const hoverTimeout = useRef(null);

  const yourLists = [
    'Create a Wish List',
    'Wish from Any Website',
    'Baby Wishlist',
    'Discover Your Style',
    'Explore Showroom',
  ];

  const yourAccount = [
    'Your Account',
    'Your Orders',
    'Your Wish List',
    'Keep shopping for',
    'Your Recommendations',
    'Your Prime Membership',
    'Your Prime Video',
    'Your Subscribe & Save Items',
    'Memberships & Subscriptions',
    'Your Seller Account',
    'Manage Your Content and Devices',
    'Register for a free Business Account',
  ];

  const clearCloseTimeout = () => {
    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current);
      hoverTimeout.current = null;
    }
  };

  const handleMouseEnter = () => {
    clearCloseTimeout();
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    hoverTimeout.current = setTimeout(() => {
      setIsOpen(false);
    }, 100);
  };

  // Keyboard focus handlers
  const handleFocus = () => {
    clearCloseTimeout();
    setIsOpen(true);
  };

  const handleBlur = () => {
    hoverTimeout.current = setTimeout(() => {
      setIsOpen(false);
    }, 100);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => clearCloseTimeout();
  }, []);

  return (
    <div className="relative text-white text-sm">
      {/* Trigger */}
      <div
        tabIndex={0}
        className="cursor-pointer px-2 py-1 whitespace-nowrap outline-none"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <pre className="leading-tight">Hello, sign in</pre>
        <b>Accounts & Lists</b>
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div
          className="absolute top-full right-0 w-[420px] mt-1 bg-white text-black border border-gray-200 shadow-md rounded-sm text-sm z-50"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onFocus={handleFocus}
          onBlur={handleBlur}
          tabIndex={-1} // allow focus inside dropdown but not in tab order unless focused
        >
          <SignInPanel />
          <div className="flex p-2 gap-3">
            <div className="border-r border-gray-300 pr-3 pl-3">
              <ListSection title="Your Lists" items={yourLists} />
            </div>
            <div className="pl-3">
              <ListSection title="Your Account" items={yourAccount} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountDropdown;
