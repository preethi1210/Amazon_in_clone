import React from "react";
import { useDispatch } from "react-redux";
import { updateCart, removeFromCart } from "../slices/cart";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const increaseQty = () => {
    dispatch(updateCart({ productId: item.productId._id, quantity: item.quantity + 1 }));
  };

  const decreaseQty = () => {
    if (item.quantity > 1) {
      dispatch(updateCart({ productId: item.productId._id, quantity: item.quantity - 1 }));
    }
  };

  const removeItem = () => {
    dispatch(removeFromCart(item.productId._id));
  };

  return (
    <div className="flex justify-between items-center border-b py-3">
      <div className="flex gap-4">
        <img src={item.productId.image} alt={item.productId.name} className="w-24 h-24 object-contain"/>
        <div>
          <h3 className="font-semibold">{item.productId.name}</h3>
          <p>₹{item.productId.price}</p>
          <div className="flex gap-2 mt-2">
            <button onClick={decreaseQty} className="px-2 py-1 border rounded">-</button>
            <span>{item.quantity}</span>
            <button onClick={increaseQty} className="px-2 py-1 border rounded">+</button>
          </div>
        </div>
      </div>
      <button onClick={removeItem} className="px-3 py-1 bg-red-500 text-white rounded">
        Remove
      </button>
    </div>
  );
};

export default CartItem;
