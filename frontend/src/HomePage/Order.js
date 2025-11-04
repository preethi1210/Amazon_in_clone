import React from "react";
import moment from "moment";
import CheckoutProduct from "./CheckoutProduct";
import CurrencyFormat from "react-currency-format";

function Order({ order }) {
  return (
    <div className="bg-white border border-gray-300 p-6 my-4 relative rounded-md shadow-sm">
      <h2 className="text-xl font-semibold mb-2">Order</h2>
      <p className="text-gray-500 mb-2">
        {moment(order.created).format("MMMM Do YYYY, h:mma")}
      </p>
      <p className="absolute top-6 right-6 text-sm text-gray-400">
        Order ID: {order._id}
      </p>

      <div className="space-y-4 mt-4">
        {order.items?.map((item, index) => (
          <CheckoutProduct
            key={index}
            id={item.productId._id}
            title={item.productId.name}
            image={item.productId.image}
            price={item.productId.price}
            rating={item.productId.rating || 5}
            hideButton
          />
        ))}
      </div>

      <CurrencyFormat
        renderText={(value) => (
          <h3 className="text-right font-medium mt-4 text-lg">
            Order Total: {value}
          </h3>
        )}
        decimalScale={2}
        value={order.amount}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"₹"}
      />
    </div>
  );
}

export default Order;
