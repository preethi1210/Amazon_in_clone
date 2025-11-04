import React, { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import {
  SlArrowRight,
  SlArrowDown,
  SlArrowUp,
  SlArrowLeft,
} from "react-icons/sl";
import { Link } from "react-router-dom";

const All_categories = () => {
  const [showPrograms, setShowPrograms] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [subMenuPage, setSubMenuPage] = useState(null);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const name = localStorage.getItem("userName");
    setUserName(name || "");
  }, []);

  const togglePrograms = () => setShowPrograms(!showPrograms);
  const toggleCategories = () => setShowCategories(!showCategories);

  const toggleSubMenu = (item) => {
    setSubMenuPage((prev) => (prev === item ? null : item));
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userIdentifier");
    localStorage.removeItem("userName");
    setUserName("");
  };

  const goBackToMain = () => setSubMenuPage(null);

  // Submenu items for each main category
  const subMenus = {
    "Mobiles, Computers": [
      "All Mobile Phones",
      "Laptops",
      "Tablets",
      "Accessories",
      "Power Banks",
      "Smart Home",
    ],
    "TV, Appliances, Electronics": [
      "Televisions",
      "Headphones",
      "Cameras",
      "Appliances",
      "Air Conditioners",
      "Refrigerators",
      "Washing Machines",
    ],
    "Men's Fashion": [
      "Shirts",
      "Jeans",
      "Shoes",
      "T-shirts",
      "Watches",
      "Bags & Luggage",
    ],
    "Women's Fashion": [
      "Clothing",
      "Handbags",
      "Jewellery",
      "Shoes",
      "Accessories",
      "Western Wear",
    ],
    "Echo & Alexa": [
      "See all devices with Alexa",
      "Meet Alexa",
      "Alexa Skills",
      "Alexa App",
      "Alexa Smart Home",
      "Amazon Prime Music",
    ],
    "Fire TV": ["Amazon Prime Video", "Fire TV Apps & Games", "See all Fire TV devices"],
    "Kindle E-Readers": [
      "All-new Kindle",
      "All-new Kindle Paperwhite",
      "Kindle Paperwhite Starter Pack",
      "All-New Kindle Oasis",
      "Refurbished & Open Box",
      "Kindle E-Reader Accessories",
      "Kindle eBooks",
      "Prime Reading",
    ],
    "Audible Audiobooks": ["Audible Membership", "All Audiobooks", "Best Sellers"],
    "Amazon Prime Video": ["All Videos", "Categories", "My Stuff"],
    "Amazon Prime Music": ["Amazon Prime Music", "Open web player", "Voice controlled with Alexa"],
    "Gift Cards": [
      "All Gift Cards",
      "Popular Gift Cards",
      "Gift Boxes & Tags",
      "Birthday Gift Cards",
      "Corporate Gift Cards",
      "Mobile Recharges",
    ],
    "Programs & Features": [
      "Handloom and Handicrafts",
      "Amazon Saheli",
      "Amazon Custom",
      "Flight Tickets",
      "Buy More, Save More",
      "Clearance Store",
      "International Brands",
    ],
  };

  // Main categories
  const mainCategories = [
    "Mobiles, Computers",
    "TV, Appliances, Electronics",
    "Men's Fashion",
    "Women's Fashion",
    "Echo & Alexa",
    "Fire TV",
    "Kindle E-Readers",
    "Audible Audiobooks",
    "Amazon Prime Video",
    "Amazon Prime Music",
    "Gift Cards",
  ];

  // Other categories under "See more"
  const otherCategories = [
    "Home, Kitchen, Pets",
    "Beauty, Health, Grocery",
    "Sports, Fitness, Bags, Luggage",
    "Toys, Baby Products, Kids' Fashion",
    "Car, Motorbike, Industrial",
    "Books",
    "Movies, Music & Video Games",
    "Amazon Pay",
    "Amazon Launchpad",
    "Amazon Business",
  ];

  // Render submenu page
  const renderSubMenu = (item) => (
    <div className="p-4 w-80">
      <button
        onClick={goBackToMain}
        className="flex items-center text-black mb-2 text-lg w-full"
      >
        <SlArrowLeft className="mr-2 text-lg" /> Back to Menu
      </button>
      <h4 className="font-bold text-lg mb-3">{item}</h4>
      <ul className="space-y-2 text-black">
        {subMenus[item]?.map((subItem) => (
          <li key={subItem}>
            <Link
              to={`/category/${encodeURIComponent(subItem)}`}
              className="text-blue-600 hover:underline"
            >
              {subItem}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );

  if (subMenuPage) return renderSubMenu(subMenuPage);

  return (
    <div className="w-80 bg-white text-black text-sm max-h-[80vh] overflow-y-auto">
      {/* User section */}
      <div className="bg-blue-950 text-white p-3">
        <div className="flex items-center gap-3 p-2">
          <FaUser className="text-2xl" />
          <h3 className="font-bold text-xl">
            {userName ? `Hello, ${userName}` : "Hello, sign in"}
          </h3>
        </div>
      </div>

      <div className="p-4">
        {/* Main Categories */}
        <div>
          <h4 className="font-bold mb-3">Shop by Category</h4>
          <ul className="space-y-2">
            {mainCategories.map((item) => (
              <li
                key={item}
                className="flex justify-between items-center cursor-pointer hover:bg-gray-100 p-1 rounded"
                onClick={() => toggleSubMenu(item)}
              >
                <span>{item}</span>
                <SlArrowRight />
              </li>
            ))}

            {/* See more toggle */}
            <li
              className="flex justify-between items-center cursor-pointer hover:bg-gray-100 p-1 rounded"
              onClick={toggleCategories}
            >
              {showCategories ? "See less" : "See more"}{" "}
              {showCategories ? <SlArrowUp /> : <SlArrowDown />}
            </li>

            {/* Other Categories */}
            {showCategories &&
              otherCategories.map((item) => (
                <li key={item} className="ml-4 p-1 hover:bg-gray-100 rounded">
                  <Link
                    to={`/category/${encodeURIComponent(item)}`}
                    className="text-blue-600 hover:underline"
                  >
                    {item}
                  </Link>
                </li>
              ))}
          </ul>
        </div>

        <hr className="border-t border-gray-300 my-4" />

        {/* Help & Settings */}
        <div>
          <h4 className="font-bold mb-3">Help & Settings</h4>
          <ul className="space-y-2">
            <li>
              <Link to="/account" className="hover:underline text-blue-600">
                Your Account
              </Link>
            </li>
            <li>
              <Link to="/customer-service" className="hover:underline text-blue-600">
                Customer Service
              </Link>
            </li>
            {userName ? (
              <li>
                <button
                  onClick={logout}
                  className="text-red-500 hover:text-red-700 font-semibold"
                >
                  Logout
                </button>
              </li>
            ) : (
              <li>
                <Link to="/login" className="text-blue-600 hover:underline">
                  Sign In
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default All_categories;
