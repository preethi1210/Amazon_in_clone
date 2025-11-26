import React, { useEffect, useState } from "react";
import Order from "./Order";
import axios from "axios";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(  `${process.env.REACT_APP_API_BASE_URL}/orders`,{
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(data);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setOrders([]);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6 md:px-20">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10 text-gray-800 tracking-tight">
          Your Orders
        </h1>

        {orders.length > 0 ? (
          <div className="flex flex-col gap-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200"
              >
                <Order order={order} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center mt-24">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4555/4555971.png"
              alt="No orders"
              className="w-40 mb-6 opacity-80"
            />
            <p className="text-gray-500 text-lg">
              You haven’t placed any orders yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;
