import React from 'react';
import fan from "./images/fan.jpg";
import dryer from "./images/dryer.jpg";
import wt_machine from "./images/wt_machine.jpg";
import mosquito_bat from "./images/mosqito_bat.jpg";
import odomos from "./images/odomos.jpg";
import toaster from "./images/toaster.jpg";
import socks from "./images/socks.jpg";
import fridge_utility from "./images/fridge_utility.jpg";
import brick_poster from "./images/brick_poster.jpg";
import iron_hang from "./images/iron_hang.jpg";
import clock from "./images/clock.jpg";
import indstove from "./images/indstove.jpg";
import serums from "./images/Serums.jpg";

const items = [
  fan, dryer, wt_machine, mosquito_bat, odomos,
  toaster, socks, fridge_utility, brick_poster,
  iron_hang, clock, indstove, serums
];

const Content3 = () => {
  return (
    <div className="p-4 bg-white rounded shadow mx-6">
      {/* Heading */}
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-bold text-gray-800">
          Minimum 50% off | Home, kitchen & outdoors
        </h2>
        <h5 className="text-blue-600 cursor-pointer hover:underline text-sm">
          See all offers
        </h5>
      </div>

      {/* Scrollable Image Row */}
      <div className="flex space-x-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
        {items.map((imgSrc, index) => (
          <div
            key={index}
            className="min-w-[150px] h-36 border border-gray-200 rounded-md overflow-hidden shadow-sm hover:shadow-md transition bg-white flex items-center justify-center"
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
  );
};

export default Content3;
