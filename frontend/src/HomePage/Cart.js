import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import CartItem from "./CartItem";
import { fetchCart } from "../slices/cart";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.cart);
  const [selectedItems, setSelectedItems] = useState([]);
  const selectedItemsArray = items.filter((item) =>
    selectedItems.includes(item.productId._id)
  );

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const toggleSelect = (itemId) => {
    setSelectedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const totalPrice = selectedItems.reduce((sum, id) => {
    const item = items.find((i) => i.productId._id === id);
    return sum + (item?.productId.price || 0) * (item?.quantity || 0);
  }, 0);

  return (
    <div className="p-6 md:p-10 min-h-screen bg-gray-100">
      <h2 className="text-3xl font-bold mb-8 text-center">Shopping Cart</h2>

      {items.length === 0 ? (
        <p className="text-center text-gray-500 text-lg mt-16">
          Your cart is empty
        </p>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="flex-1 space-y-6">
            {items.map((item) => (
              <div
                key={item.productId._id}
                className="flex items-center gap-4 bg-white p-4 rounded-lg shadow hover:shadow-lg transition duration-300"
              >
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item.productId._id)}
                  onChange={() => toggleSelect(item.productId._id)}
                  className="w-5 h-5 accent-yellow-400"
                />
                <CartItem item={item} />
              </div>
            ))}
          </div>

          {/* Order Summary */}
          {selectedItems.length > 0 && (
            <div className="lg:w-1/3 bg-white p-6 rounded-lg shadow sticky top-24 h-max transition">
              <h3 className="text-2xl font-semibold mb-6 border-b pb-2">
                Order Summary
              </h3>

              <div className="mb-4 flex justify-between">
                <span className="text-gray-700 font-medium">Selected Items:</span>
                <span className="font-bold text-gray-900">{selectedItems.length}</span>
              </div>

              <div className="mb-6 flex justify-between">
                <span className="text-gray-700 font-medium">Total Price:</span>
                <span className="font-bold text-gray-900">₹{totalPrice}</span>
              </div>

              <button
                onClick={() =>
                  navigate("/checkout", { state: { selectedItems: selectedItemsArray } })
                }
                className="w-full px-6 py-3 bg-yellow-400 text-black font-semibold rounded hover:bg-yellow-500 transition duration-300"
              >
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Cart;
