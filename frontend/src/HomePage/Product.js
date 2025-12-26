import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart, fetchCart } from "../slices/cart";

function Product({ _id, title, image, price, rating }) {
  const dispatch = useDispatch();
  const [added, setAdded] = useState(false); // for notification

  const handleAddToCart = async () => {
    try {
      await dispatch(
        addToCart({
          productId: _id,
          quantity: 1,
        })
      ).unwrap();
      dispatch(fetchCart());
      setAdded(true); // show notification
      setTimeout(() => setAdded(false), 2000); // hide after 2 sec
    } catch (err) {
      console.error("Failed to add item to cart:", err);
    }
  };

  return (
    <div className="flex flex-col items-center bg-white p-5 m-2 w-full max-w-xs rounded-md shadow-md relative">
      {/* Notification */}
      {added && (
        <div className="absolute top-2 right-2 bg-green-500 text-white px-3 py-1 rounded shadow-md text-sm">
          Added to cart!
        </div>
      )}

      <div className="h-24 mb-4 text-center">
        <p className="text-sm font-medium">{title}</p>
        <p className="mt-1 text-lg font-semibold">
          <span className="text-sm">₹</span>
          {price}
        </p>
<div className="flex justify-center mt-1">
  {Array(Math.max(0, Math.round(rating || 0)))
    .fill()
    .map((_, i) => (
      <span key={i}>🌟</span>
    ))}
</div>

      </div>

      <img className="w-full h-48 object-contain mb-4" src={image} alt={title} />

      <button
        onClick={handleAddToCart}
        className="w-full bg-yellow-400 hover:bg-yellow-300 border border-yellow-600 text-black py-2 rounded-md font-semibold transition duration-200"
      >
        Add to Cart
      </button>
    </div>
  );
}

export default Product;
