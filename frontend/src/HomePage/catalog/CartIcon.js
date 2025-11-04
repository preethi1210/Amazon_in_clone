import React from "react";
import { MdShoppingCartCheckout } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CartIcon = () => {
  const { items } = useSelector((state) => state.cart);
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Link to="/cart" className="relative cursor-pointer">
      <MdShoppingCartCheckout className="text-2xl" />
      {cartCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-bold px-1.5 py-0.5 rounded-full">
          {cartCount}
        </span>
      )}
    </Link>
  );
};

export default CartIcon;
