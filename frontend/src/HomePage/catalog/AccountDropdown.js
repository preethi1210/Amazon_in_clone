import React, { useState, useRef, useEffect } from 'react';
import ListSection from '../ListSection';
import ReactDOM from 'react-dom';
import { Link, useNavigate } from 'react-router-dom';

const AccountDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Load user name from localStorage whenever the dropdown opens
  useEffect(() => {
    const name = localStorage.getItem("userName");
    setUserName(name || "");
  }, [isOpen]); // <-- dependency ensures it updates whenever dropdown opens

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

  const yourLists = [
    { title: 'Create a Wish List', link: '/wishlist/create' },
    { title: 'Wish from Any Website', link: '/wishlist/import' },
    { title: 'Baby Wishlist', link: '/wishlist/baby' },
    { title: 'Discover Your Style', link: '/wishlist/style' },
    { title: 'Explore Showroom', link: '/showroom' },
  ];

  const yourAccount = [
    { title: 'Your Account', link: '/profile' },
    { title: 'Your Orders', link: '/orders' },
    { title: 'Your Wish List', link: '/wishlist' },
    { title: 'Cart', link: '/cart' },
    { title: 'Your Recommendations', link: '/recommendations' },
    { title: 'Your Prime Membership', link: '/prime' },
    { title: 'Your Prime Video', link: '/prime/video' },
    { title: 'Memberships & Subscriptions', link: '/subscriptions' },
    { title: 'Your Seller Account', link: '/seller' },
    { title: 'Manage Your Content and Devices', link: '/devices' },
    { title: 'Register for a free Business Account', link: '/business' },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userIdentifier");
    localStorage.removeItem("userName");
    setUserName("");
    navigate("/login");
    setIsOpen(false);
  };

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
          <pre className="leading-tight">
            {userName ? `Hello, ${userName}` : 'Hello, sign in'}
          </pre>
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
                {/* Show logout if user is logged in */}
                {userName ? (
                  <div className="p-3">
                    <p className="mb-2 font-semibold">Welcome back, {userName}</p>
                    <button
                      onClick={handleLogout}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="p-3 text-center text-gray-700">
                    <Link
                      to="/signin"
                      className="bg-yellow-400 hover:bg-yellow-300 px-3 py-1 rounded"
                      onClick={() => setIsOpen(false)}
                    >
                      Sign In
                    </Link>
                  </div>
                )}

                <div className="flex p-2 gap-3">
                  <div className="border-r border-gray-300 pr-3 pl-3">
                    <ListSection 
                      title="Your Lists" 
                      items={yourLists.map(item => (
                        <Link key={item.title} to={item.link} className="block hover:underline">{item.title}</Link>
                      ))} 
                    />
                  </div>
                  <div className="pl-3">
                    <ListSection 
                      title="Your Account" 
                      items={yourAccount.map(item => (
                        <Link key={item.title} to={item.link} className="block hover:underline">{item.title}</Link>
                      ))} 
                    />
                  </div>
                </div>
              </div>
            </div>
          </>,
          document.body
        )}
    </>
  );
};

export default AccountDropdown;
