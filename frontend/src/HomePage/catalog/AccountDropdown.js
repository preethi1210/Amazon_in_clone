import React, { useState, useRef, useEffect } from 'react';
import SignInPanel from '../SignInPanel';
import ListSection from '../ListSection';
import ReactDOM from 'react-dom';

const AccountDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

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

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      {/* Trigger */}
      <div className="relative text-white text-sm z-50">
        <div
          tabIndex={0}
          className="cursor-pointer px-2 py-1 whitespace-nowrap outline-none"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-haspopup="true"
          aria-expanded={isOpen}
        >
          <pre className="leading-tight">Hello, sign in</pre>
          <b>Accounts & Lists</b>
        </div>
      </div>

      {/* Portal for Overlay + Dropdown */}
      {isOpen &&
        ReactDOM.createPortal(
          <>
            {/* Dark overlay */}
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Dropdown panel */}
            <div
              className="fixed top-[70px] right-20 z-50"
              ref={dropdownRef}
            >
              <div className="w-[420px] bg-white text-black border border-gray-200 shadow-md rounded-sm text-sm">
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
            </div>
          </>,
          document.body // ← Portal renders here
        )}
    </>
  );
};

export default AccountDropdown;
