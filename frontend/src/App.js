import React from 'react';
import './App.css';
import Navbar1 from './HomePage/Navbar1';
import Navbar2 from './HomePage/Navbar2';
import Footer from './HomePage/Footer';
import Footer2 from './HomePage/Footer2';
import Footer3 from './HomePage/Footer3';

function App() {
  return (
    <div className="w-screen min-h-screen overflow-x-hidden bg-gray-100">
      {/* Top Navbars */}
      <Navbar1 />
      <Navbar2 />

      {/* Back to Top Section */}
<div
  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
  className="bg-gray-700 text-white flex justify-center items-center py-3 cursor-pointer hover:bg-gray-600 transition"
>
  Back to top
</div>

      {/* Footer Sections */}
      <Footer3 />
      <Footer2 />
      <Footer />
    </div>
  );
}

export default App;
