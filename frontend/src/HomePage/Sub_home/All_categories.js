import React, { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { SlArrowRight, SlArrowDown, SlArrowUp, SlArrowLeft } from 'react-icons/sl';

const All_categories = () => {
  const [showPrograms, setShowPrograms] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const [subMenuPage, setSubMenuPage] = useState(null);

  const togglePrograms = () => setShowPrograms(!showPrograms);
  const toggleCategories = () => setShowCategories(!showCategories);

  const toggleSubMenu = (item) => {
    setActiveSubMenu((prev) => (prev === item ? null : item));
    setSubMenuPage(item);
  };

  const goBackToMain = () => {
    setSubMenuPage(null);
  };

  const renderSubMenu = (item) => {
    const subMenus = {
      'Echo & Alexa': [
        'See all devices with Alexa',
        'Meet Alexa',
        'Alexa Skills',
        'Alexa App',
        'Alexa Smart Home',
        'Amazon Prime Music'
      ],
      'Fire TV': [
        'Amazon Prime Video',
        'Fire TV Apps & Games',
        'See all Fire TV devices'
      ],
      'Kindle E-Readers': [
        'All-new Kindle',
        'All-new Kindle Paperwhite',
        'Kindle Paperwhite Starter Pack',
        'All-New Kindle Oasis',
        'Refurbished & Open Box',
        'Kindle E-Reader Accessories',
        'See all Kindle E-readers',
        'Kindle eBooks',
        'All Kindle eBooks',
        'Prime Reading',
        'Kindle Unlimited',
        'Deals on Kindle eBooks',
        'Kindle Exam Central',
        'Kindle eTextbooks',
        'eBook Bestsellers',
        'eBooks in Indian Languages',
        'Hindi',
        'Tamil'
      ],
      'Audible Audiobooks': [
        'Audible Membership',
        'All Audiobooks',
        'Best Sellers',
        'New Releases',
        'Hindi Audiobooks'
      ],
      'Amazon Prime Video': [
        'All Videos',
        'Categories',
        'My Stuff',
        'Hello, sign in'
      ],
      'Amazon Prime Music': [
        'Amazon Prime Music',
        'Open web player',
        'Voice controlled with Alexa',
        'Amazon Prime Music Apps',
        'CDs and Vinyls',
        'Hello, sign in'
      ],
      'Gift Cards': [
        'All Gift Cards',
        'Popular Gift Cards',
        'Gift Boxes, Gift Tags, Greeting Cards',
        'Popular Brand Gift Vouchers',
        'Birthday Gift Cards',
        'Wedding & Anniversary',
        'Best Wishes & Thank You',
        'Corporate Gift Cards',
        'Recharges',
        'Mobile Recharges'
      ],
      'Mobiles, Computers': [
        'All Mobile Phones',
        'All Mobile Accessories',
        'Cases & Covers',
        'Screen Protectors',
        'Power Banks',
        'Refurbished & Open Box',
        'Tablets',
        'Wearable Devices',
        'Smart Home',
        'Office Supplies & Stationery',
        'Software',
        'All Computers & Accessories',
        'Laptops',
        'Drives & Storage',
        'Printers & Ink',
        'Networking Devices',
        'Computer Accessories',
        'Game Zone',
        'Monitors',
        'Desktops',
        'Components',
        'All Electronics'
      ],
      'TV, Appliances, Electronics': [
        'Televisions',
        'Home Entertainment Systems',
        'Headphones',
        'Speakers',
        'Home Audio & Theater',
        'Cameras',
        'DSLR Cameras',
        'Security Cameras',
        'Camera Accessories',
        'Musical Instruments & Professional Audio',
        'Gaming Consoles',
        'All Electronics',
        'Appliances',
        'Air Conditioners',
        'Refrigerators',
        'Washing Machines',
        'Kitchen & Home Appliances',
        'Heating & Cooling Appliances',
        'All Appliances'
      ],
      "Men's Fashion": [
        'Clothing', 'T-shirts & Polos', 'Shirts', 'Jeans', 'Innerwear', 'Accessories',
        'Watches', 'Bags & Luggage', 'Sunglasses', 'Jewellery', 'Wallets',
        'Shoes', 'Sports Shoes', 'Formal Shoes', 'Casual Shoes', 'Stores', 'Sportswear',
        'The Designer Boutique', 'Amazon Fashion', "Men's Handlooms", 'Fashion Sales & Deals'
      ],
      "Women's Fashion": [
        'Clothing', 'Western Wear', 'Ethnic Wear', 'Lingerie & Nightwear', 'Top Brands',
        'Accessories', 'Watches', 'Handbags & Clutches', 'Gold & Diamond Jewellery',
        'Fashion & Silver Jewellery', 'Sunglasses', 'Shoes', 'Fashion Sandals',
        'Ballerinas', 'Stores', 'The Designer Boutique', 'Handloom & Handicraft Store',
        'Sportswear', 'Amazon Fashion', 'Fashion Sales & Deals'
      ]
    };

    return (
      <div className="p-4">
        <button onClick={goBackToMain} className="flex items-center text-black mb-2 text-lg w-80">
          <SlArrowLeft className="mr-2 text-lg" /> Back to Menu
        </button>
        <h4 className="font-bold text-lg mb-3">{item}</h4>
        <ul className="space-y-5 text-black">
          {subMenus[item]?.map((subItem) => (
            <li key={subItem}>{subItem}</li>
          ))}
        </ul>
      </div>
    );
  };

  if (subMenuPage) return renderSubMenu(subMenuPage);

  return (
    <div className="w-80 bg-white text-black text-sm max-h-[80vh] overflow-y-auto">
      <div className="bg-blue-950 text-white p-3">
        <div className="flex items-center gap-3 p-2">
          <FaUser className="text-2xl" />
          <h3 className="font-bold text-xl">Hello, sign in</h3>
        </div>
      </div>

      <div className="p-4">
        {/* Trending */}
        <div>
          <h4 className="font-bold mb-3">Trending</h4>
          <ul className="space-y-3">
            <li>Bestsellers</li>
            <li>New Releases</li>
            <li>Movers and Shakers</li>
          </ul>
        </div>

        <hr className="border-t border-gray-300 my-4" />

        {/* Digital Content */}
        <div>
          <h4 className="font-bold mb-3">Digital Content and Devices</h4>
          <ul className="space-y-3">
            {['Echo & Alexa', 'Fire TV', 'Kindle E-Readers', 'Audible Audiobooks', 'Amazon Prime Video', 'Amazon Prime Music'].map((item) => (
              <li key={item} className="flex justify-between items-center cursor-pointer" onClick={() => toggleSubMenu(item)}>
                {item} <SlArrowRight />
              </li>
            ))}
          </ul>
        </div>

        <hr className="border-t border-gray-300 my-4" />

        {/* Programs & Features */}
        <div>
          <h4 className="font-bold mb-3">Programs & Features</h4>
          <ul className="space-y-3">
            {[ 'Amazon Pay', 'Gift Cards', 'Amazon Launchpad', 'Amazon Business' ].map((item) => (
              <li key={item} className="flex justify-between items-center cursor-pointer" onClick={() => toggleSubMenu(item)}>
                {item} <SlArrowRight />
              </li>
            ))}
            <li className="flex justify-between items-center cursor-pointer" onClick={togglePrograms}>
              {showPrograms ? 'See less' : 'See all'} {showPrograms ? <SlArrowUp /> : <SlArrowDown />}
            </li>
            {showPrograms && (
              <ul className="ml-4 space-y-2 text-gray-600">
                {[ 'Handloom and Handicrafts', 'Amazon Saheli', 'Amazon Custom', 'Flight Tickets', 'Buy more, Save more', 'Clearance store', 'International Brands' ].map((item) => <li key={item}>{item}</li>)}
              </ul>
            )}
          </ul>
        </div>

        <hr className="border-t border-gray-300 my-4" />

        {/* Categories */}
        <div>
          <h4 className="font-bold mb-3">Shop by Category</h4>
          <ul className="space-y-3">
            {[ 'Mobiles, Computers', 'TV, Appliances, Electronics', "Men's Fashion", "Women's Fashion" ].map((item) => (
              <li key={item} className="flex justify-between items-center cursor-pointer" onClick={() => toggleSubMenu(item)}>
                {item} <SlArrowRight />
              </li>
            ))}
            <li className="flex justify-between items-center cursor-pointer" onClick={toggleCategories}>
              {showCategories ? 'See less' : 'See more'} {showCategories ? <SlArrowUp /> : <SlArrowDown />}
            </li>
            {showCategories && (
              <ul className="ml-4 space-y-2 text-gray-600">
                {[ 'Home, Kitchen, Pets', 'Beauty, Health, Grocery', 'Sports, Fitness, Bags, Luggage', "Toys, Baby Products, Kids' Fashion", 'Car, Motorbike, Industrial', 'Books', 'Movies, Music & Video Games' ].map((item) => <li key={item}>{item}</li>)}
              </ul>
            )}
          </ul>
        </div>

        <hr className="border-t border-gray-300 my-4" />

        {/* Help & Settings */}
        <div>
          <h4 className="font-bold mb-3">Help & Settings</h4>
          <ul className="space-y-3">
            <li>Your Account</li>
            <li>Customer Service</li>
            <li>Sign in</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default All_categories;
