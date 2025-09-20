// Layout.jsx
import React from "react";
import Navbar1 from "./Navbar1";
import Navbar2 from "./Navbar2";
import Footer from "./Footer";
import Footer2 from "./Footer2";
import Footer3 from "./Footer3";

const Layout = ({ children }) => {
  return (
    <div className="w-screen min-h-screen overflow-x-hidden bg-gray-100 flex flex-col">
      {/* Navbars */}
      <Navbar1 />
      <Navbar2 />

      {/* Page content */}
      <main className="flex-1 bg-gray-200 mt-4">{children}</main>

      {/* Back to top */}
      <div
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="bg-gray-700 text-white flex justify-center items-center py-3 cursor-pointer hover:bg-gray-600 transition"
      >
        Back to top
      </div>

      {/* Footers */}
      <Footer3 />
      <Footer2 />
      <Footer />
    </div>
  );
};

export default Layout;
