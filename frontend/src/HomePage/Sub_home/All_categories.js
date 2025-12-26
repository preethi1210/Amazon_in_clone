import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { SlArrowRight, SlArrowLeft, SlArrowUp, SlArrowDown } from "react-icons/sl";

const All_categories = () => {
  const [showCategories, setShowCategories] = useState(false);
  const [subMenuPage, setSubMenuPage] = useState(null);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const name = localStorage.getItem("userName");
    setUserName(name || "");
  }, []);

  const toggleSubMenu = (item) => setSubMenuPage(prev => (prev === item ? null : item));
  const toggleCategories = () => setShowCategories(prev => !prev);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userIdentifier");
    localStorage.removeItem("userName");
    setUserName("");
  };

  const goBackToMain = () => setSubMenuPage(null);

  // Submenu items mapping
  const subMenus = {
    "Mobiles, Computers": ["All Mobile Phones", "Laptops", "Tablets", "Accessories", "Power Banks"],
    "TV, Appliances, Electronics": ["Televisions", "Headphones", "Refrigerators", "Washing Machines", "Cameras"],
    "Men's Fashion": ["Shirts", "Jeans", "Shoes", "T-shirts", "Watches"],
    "Women's Fashion": ["Clothing", "Handbags", "Jewellery", "Shoes", "Accessories"],
  };

  const mainCategories = Object.keys(subMenus);

  const otherCategories = [
    "Home, Kitchen, Pets",
    "Beauty, Health, Grocery",
    "Sports, Fitness, Bags, Luggage",
    "Toys, Baby Products, Kids' Fashion",
    "Books",
    "Movies, Music & Video Games",
  ];

  // Render submenu page
  const renderSubMenu = (item) => (
    <div className="p-4 w-80">
      <button
        onClick={goBackToMain}
        className="flex items-center text-black mb-2 text-lg w-full"
      >
        <SlArrowLeft className="mr-2" /> Back to Menu
      </button>
      <h4 className="font-bold text-lg mb-3">{item}</h4>
      <ul className="space-y-2">
        {subMenus[item].map((subItem) => (
          <li key={subItem} className="hover:underline">
            <Link
              to={`/category/${encodeURIComponent(subItem)}`} // ✅ link points to ProductsPage
              className="text-blue-600"
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
    <div className="w-80 bg-white max-h-[80vh] overflow-y-auto text-black text-sm">
      <div className="bg-blue-950 text-white p-3 flex items-center gap-2">
        <FaUser className="text-2xl" />
        <span className="font-bold">{userName ? `Hello, ${userName}` : "Hello, sign in"}</span>
      </div>

      <div className="p-4">
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

          <li
            className="flex justify-between items-center cursor-pointer hover:bg-gray-100 p-1 rounded"
            onClick={toggleCategories}
          >
            {showCategories ? "See less" : "See more"}{" "}
            {showCategories ? <SlArrowUp /> : <SlArrowDown />}
          </li>

          {showCategories &&
            otherCategories.map((item) => (
              <li key={item} className="ml-4 p-1 hover:bg-gray-100 rounded">
                <Link
                  to={`/category/${encodeURIComponent(item)}`} // ✅ link points to ProductsPage
                  className="text-blue-600 hover:underline"
                >
                  {item}
                </Link>
              </li>
            ))}
        </ul>

        <hr className="border-t my-4" />

        <div>
          <h4 className="font-bold mb-2">Help & Settings</h4>
          <ul className="space-y-2">
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
