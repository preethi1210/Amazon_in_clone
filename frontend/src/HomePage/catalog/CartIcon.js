import React from 'react';
import { MdShoppingCartCheckout } from "react-icons/md";

const CartIcon = () => {
  const cartCount = 0;

  return (
    <div className="relative border border-transparent hover:border-white rounded-sm transition duration-200 group p-2 cursor-pointer">
      <MdShoppingCartCheckout className="text-2xl" />

      {/* Centered and animated badge */}
      <span className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-black text-xs font-bold px-1.5 py-0.5 rounded-full transition-all duration-200 group-hover:-translate-y-1">
        {cartCount}
      </span>
    </div>
  );
};

export default CartIcon;
