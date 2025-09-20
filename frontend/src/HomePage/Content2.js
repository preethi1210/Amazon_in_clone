import React, { useState } from 'react';
import filter from "./images/filter.jpg";
import table from "./images/table.jpg";
import asus from "./images/asus.jpg";
import headset from "./images/headset.jpg";
import usb from "./images/usb.jpg";
import jbl from "./images/jbl.jpg";
import amazonstick from "./images/amazonstick.jpg";
import hp15 from "./images/hp15.jpg";
import macm1 from "./images/macm1.jpg";
import airbuds from "./images/air_buds.jpg";

const products = [
  {
    img: airbuds,
    title: 'Samsung Galaxy Buds 3 Pro',
    discount: '24%',
    price: '₹18,998',
    mrp: '₹24,900',
    desc: 'Galaxy Buds 3 Pro (Silver)',
  },
  {
    img: macm1,
    title: 'Apple MacBook M1',
    discount: '24%',
    price: '₹69,998',
    mrp: '₹89,900',
    desc: 'MacBook M1 (Silver)',
  },
  {
    img: hp15,
    title: 'HP 15 Ultra',
    discount: '24%',
    price: '₹39,998',
    mrp: '₹49,900',
    desc: 'HP 15 Intel Ultra S (Silver)',
  },
  {
    img: amazonstick,
    title: 'Amazon Fire Stick',
    discount: '24%',
    price: '₹2,499',
    mrp: '₹3,299',
    desc: 'Fire Stick Air3 Pro',
  },
  {
    img: jbl,
    title: 'JBL Bar 1000',
    discount: '24%',
    price: '₹29,998',
    mrp: '₹39,900',
    desc: 'JBL Bar 1000 Pro (Silver)',
  },
  {
    img: usb,
    title: 'HP 818w USB',
    discount: '24%',
    price: '₹1,198',
    mrp: '₹1,599',
    desc: 'HP 818w USB 3.2',
  },
  {
    img: headset,
    title: 'Sony Noise Cancelling',
    discount: '24%',
    price: '₹9,998',
    mrp: '₹12,900',
    desc: 'Sony Noise Headset',
  },
  {
    img: asus,
    title: 'ASUS Laptop',
    discount: '24%',
    price: '₹49,998',
    mrp: '₹59,999',
    desc: 'ASUS i5 Laptop',
  },
  {
    img: table,
    title: 'Wooden Table',
    discount: '24%',
    price: '₹2,998',
    mrp: '₹3,999',
    desc: 'Wooden Side Table',
  },
  {
    img: filter,
    title: 'Stainless Steel Filter',
    discount: '24%',
    price: '₹998',
    mrp: '₹1,399',
    desc: 'Steel Water Filter',
  },
];

const Content2 = () => {
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 5;

  const handleNext = () => {
    setStartIndex((prevIndex) => (prevIndex + 1) % products.length);
  };

  const handlePrev = () => {
    setStartIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length);
  };

  const getVisibleItems = () => {
    let result = [];
    for (let i = 0; i < visibleCount; i++) {
      result.push(products[(startIndex + i) % products.length]);
    }
    return result;
  };

  return (
    <div className="p-4 bg-white rounded shadow mx-6">
      <h2 className="text-xl font-bold mb-4 bg-white px-3 py-2 rounded">
        Blockbuster Deals
      </h2>

      <div className="flex items-center">
        {/* Left Arrow */}
        <button
          onClick={handlePrev}
          className="text-2xl font-bold px-3 py-2 hover:bg-gray-100 rounded-full"
        >
          &lt;
        </button>

        {/* Product Grid */}
        <div className="grid grid-cols-5 gap-2 w-full">
          {getVisibleItems().map((item, index) => (
            <div
              key={index}
              className="border border-transparent hover:border-gray-300 p-3 text-center rounded shadow bg-white transition duration-300"
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-36 object-cover mb-2 rounded"
              />
              <button className="bg-red-500 text-white text-xs px-2 py-1 mb-1 rounded">
                {item.discount} OFF
              </button>
              <div className="text-xs text-red-600 mb-1">Limited Time Deal</div>
              <div className="text-sm font-semibold">
                {item.price}{' '}
                <span className="line-through text-gray-400 text-xs">{item.mrp}</span>
              </div>
              <div
                className="text-xs text-gray-700 mt-1 truncate"
                title={item.desc}
              >
                {item.desc}
              </div>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={handleNext}
          className="text-2xl font-bold px-3 py-2 hover:bg-gray-100 rounded-full"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Content2;
