import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchCart, removeFromCart } from "../slices/cart";
import CheckoutProduct from "./CheckoutProduct";
import axios from "axios";

const Payment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const itemsToPay = location.state?.selectedItems || [];

  const totalPrice = itemsToPay.reduce(
    (sum, item) => sum + (item.productId?.price || 0) * (item.quantity || 0),
    0
  );

  const handlePayment = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to proceed with payment");
      return;
    }

    try {
      // 1️⃣ Create Razorpay order in backend
      const { data: razorOrder } = await axios.post(
       `${process.env.REACT_APP_API_BASE_URL}/payment/create-order`,
        { amount: totalPrice * 100 },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID || "rzp_test_SxSUnyRLZVv7jn",
        amount: razorOrder.amount,
        currency: razorOrder.currency,
        name: "Test Shop",
        description: "Test Transaction",
        order_id: razorOrder.id,
        handler: async function (response) {
          console.log("Payment success:", response);

          try {
            // 2️⃣ Save order in backend
            await axios.post(
                     `${process.env.REACT_APP_API_BASE_URL}/orders/create`,
              { items: itemsToPay, amount: totalPrice },
              { headers: { Authorization: `Bearer ${token}` } }
            );

            // 3️⃣ Remove purchased items from cart
            itemsToPay.forEach(item => {
              dispatch(removeFromCart(item.productId._id));
            });

            dispatch(fetchCart()); // refresh cart

            alert("Payment successful and order created!");
            navigate("/orders"); // go to orders page
          } catch (err) {
            console.error("Error creating order:", err);
            alert("Payment succeeded but failed to create order!");
          }
        },
        prefill: { name: "Test User", email: "test@example.com" },
        theme: { color: "#F59E0B" },
      };

      // 4️⃣ Open Razorpay checkout
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment error:", err);
      alert("Payment failed");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <h1 className="text-2xl font-semibold mb-6">
        Checkout ({itemsToPay.length} items)
      </h1>

      <div className="bg-white p-6 rounded shadow mb-6">
        <h2 className="text-lg font-medium mb-4">Review Items</h2>
        {itemsToPay.map((item) => (
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

        <p className="text-right font-bold text-lg mt-4">
          Total: ₹{totalPrice}
        </p>
      </div>

      <button
        onClick={handlePayment}
        className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-6 rounded"
      >
        Pay with Razorpay
      </button>
    </div>
  );
};

export default Payment;
