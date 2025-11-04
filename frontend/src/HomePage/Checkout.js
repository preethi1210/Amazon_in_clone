import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CheckoutProduct from "./CheckoutProduct";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedItems = location.state?.selectedItems || [];
  const itemsToCheckout = location.state?.selectedItems || [];

  if (selectedItems.length === 0) {
    return <p>No items selected for checkout.</p>;
  }

  const totalPrice = itemsToCheckout
  .filter(item => item?.productId)
  .reduce((sum, item) => sum + item.productId.price * item.quantity, 0);
  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h2 className="text-2xl font-semibold mb-4">Checkout</h2>

      {selectedItems.map((item) => (
        <CheckoutProduct
          key={item.productId._id}
          id={item.productId._id}
          title={item.productId.name}
          image={item.productId.image}
          price={item.productId.price}
          rating={item.productId.rating || 5}
          hideButton
        />
      ))}

      <div className="mt-4 text-right font-bold text-lg">
        Total: ₹{totalPrice}
      </div>

      <div className="flex justify-end gap-4 mt-4">
        <button
          onClick={() => navigate("/cart")}
          className="px-6 py-2 bg-gray-400 rounded hover:bg-gray-500"
        >
          Return to Cart
        </button>
        <button
          onClick={() => navigate("/payment", { state: { selectedItems } })}
          className="px-6 py-2 bg-yellow-400 rounded hover:bg-yellow-500"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default Checkout;
