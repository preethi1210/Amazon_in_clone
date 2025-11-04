import React from "react";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../slices/cart";

function CheckoutProduct({ productId, image, title, price, rating, hideButton }) {
  const dispatch = useDispatch();

  const removeFromBasket = async () => {
    try {
      await dispatch(removeFromCart(productId)).unwrap();
      console.log("Item removed from cart:", productId);
    } catch (err) {
      console.error("Failed to remove item:", err);
    }
  };

  return (
    <div className="checkoutProduct flex border-b border-gray-300 pb-4">
      <img
        className="checkoutProduct__image w-24 h-24 object-contain mr-4"
        src={image}
        alt={title}
      />

      <div className="checkoutProduct__info flex-1">
        <p className="checkoutProduct__title font-medium">{title}</p>
        <p className="checkoutProduct__price font-semibold">
          ₹{price}
        </p>
        <div className="checkoutProduct__rating flex">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <span key={i}>🌟</span>
            ))}
        </div>
        {!hideButton && (
          <button
            onClick={removeFromBasket}
            className="checkoutProduct__remove mt-2 px-3 py-1 bg-red-500 text-white rounded"
          >
            Remove from Cart
          </button>
        )}
      </div>
    </div>
  );
}

export default CheckoutProduct;
