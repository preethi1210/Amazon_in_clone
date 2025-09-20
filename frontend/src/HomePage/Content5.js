import React from 'react';
import iphone16 from "./images/iphone16.jpg";
import vivo from "./images/vivo.jpg";
import mi7 from "./images/mi7.jpg";
import xi14 from "./images/xi14.jpg";
import oneplus from "./images/1plus.jpg";
import s24 from "./images/s24.jpg";
import iq13 from "./images/iq13.jpg";
import iPhone15 from "./images/iPhone15.jpg";

const Content5 = () => {
  // Define the image sources array
  const items = [iphone16, vivo, mi7, xi14, oneplus, s24, iq13, iPhone15];

  return (
    <div>
      <div className="p-4 bg-white rounded shadow mx-6">
        {/* Heading */}
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-bold text-gray-800">
            Up to 40% off | Best flagship phones on sale
          </h2>
          <h5 className="text-blue-600 cursor-pointer hover:underline text-sm">
            Explore more
          </h5>
        </div>

        {/* Scrollable Image Row */}
        <div className="flex space-x-6 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
          {items.map((imgSrc, index) => (
            <div
              key={index}
              className="min-w-[200px] h-50 border  rounded-md overflow-hidden shadow-sm hover:shadow-md transition bg-white flex items-center justify-center"
            >
              <img
                src={imgSrc}
                alt={`item-${index}`}
                className="w-full h-full object-contain p-2"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Content5;
