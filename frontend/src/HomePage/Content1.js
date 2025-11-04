import React from "react";
import { useNavigate } from "react-router-dom";
import img_items from "./images/img_items.jpg";
import ac from "./images/ac.jpg";
import fridge from "./images/fridge.jpg";
import mixy from "./images/mixy.jpg";
import wash_machine from "./images/wash_machine.jpg";
import collective from "./images/collective.jpg";
import decor from "./images/decor.jpg";
import furniture from "./images/furniture.jpg";
import home_improvement from "./images/home improvement.jpg";
import vases from "./images/vases.jpg";
import light from "./images/light.jpg";
import storage from "./images/storage.jpg";
import bed_sheet from "./images/bed_sheet.jpg";

const Content1 = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full">
      {/* Background Image */}
      <div className="w-full h-96">
        <img src={img_items} alt="Festival Banner" className="w-full h-full object-cover" />
      </div>

      {/* Gradient overlay */}
      <div className="w-full h-48 bg-gradient-to-b from-orange-500 to-white -mt-24 relative z-0"></div>

      {/* Offer Boxes */}
      <div className="flex flex-col md:flex-row gap-6 px-6 -mt-56 relative z-10">
        {/* Box 1 */}
        <div className="flex-1 bg-white p-4 shadow-md rounded-md">
          <h2 className="text-lg font-bold mb-4">Up to 65% off | Offers on home appliances</h2>
          <div className="grid grid-cols-2 gap-2">
            {[
              ["Washing Machines", wash_machine],
              ["Refrigerators", fridge],
              ["Mixers", mixy],
              ["ACs", ac],
            ].map(([label, src]) => (
              <div key={label}>
                <img src={src} alt={label} className="rounded" />
                <p className="text-sm text-center mt-1">{label}</p>
              </div>
            ))}
          </div>
          <p
            className="text-blue-600 text-sm mt-3 text-right cursor-pointer hover:underline"
            onClick={() => navigate("/products/Electronics")}
          >
            See all deals
          </p>
        </div>

        {/* Box 2 */}
        <div className="flex-1 bg-white p-4 shadow-md rounded-md">
          <h2 className="text-lg font-bold mb-4">Up to 75% off | Electronics & Accessories</h2>
          <div className="flex justify-center">
            <img src={collective} alt="Collective" className="rounded" />
          </div>
          <p
            className="text-blue-600 text-sm mt-3 text-right cursor-pointer hover:underline"
            onClick={() => navigate("/products/Electronics")}
          >
            See all offers
          </p>
        </div>

        {/* Box 3 */}
        <div className="flex-1 bg-white p-4 shadow-md rounded-md">
          <h2 className="text-lg font-bold mb-4">Minimum 50% off | Home, kitchen & more</h2>
          <div className="grid grid-cols-2 gap-2">
            {[
              ["Decor", decor],
              ["Furniture", furniture],
              ["Mixers", mixy],
              ["Home Improvement", home_improvement],
            ].map(([label, src]) => (
              <div key={label}>
                <img src={src} alt={label} className="rounded" />
                <p className="text-sm text-center mt-1">{label}</p>
              </div>
            ))}
          </div>
          <p
            className="text-blue-600 text-sm mt-3 text-right cursor-pointer hover:underline"
            onClick={() => navigate("/products/Home")}
          >
            See all deals
          </p>
        </div>

        {/* Box 4 */}
        <div className="flex-1 bg-white p-4 shadow-md rounded-md">
          <h2 className="text-lg font-bold mb-4">Revamp your home in style</h2>
          <div className="grid grid-cols-2 gap-2">
            {[
              ["Cushion covers & Bedsheets", bed_sheet],
              ["Vases & Figurines", vases],
              ["Home storage", storage],
              ["Lighting solutions", light],
            ].map(([label, src]) => (
              <div key={label}>
                <img src={src} alt={label} className="rounded" />
                <p className="text-sm text-center mt-1">{label}</p>
              </div>
            ))}
          </div>
          <p
            className="text-blue-600 text-sm mt-3 text-right cursor-pointer hover:underline"
            onClick={() => navigate("/products/Home")}
          >
            Explore all
          </p>
        </div>
      </div>
    </div>
  );
};

export default Content1;
