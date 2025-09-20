import React from "react";
import { Link } from "react-router-dom";
import Layout from "./Layout";
import cart_img from "./images/cart_img.svg"
const Cart = () => {
  return (
        <Layout>

    <div className="p-4 text-center bg-gray-200 min-h-screen">
      {/* Empty cart box */}
<div className="bg-white mx-2 my-3 p-6 rounded shadow w-3/4 flex items-center gap-6">
  {/* Left side: Image */}
  <div className="w-1/3 flex justify-center">
    <img src={cart_img} alt="Empty cart" className="max-w-full h-auto" />
  </div>

  {/* Right side: Text + buttons */}
  <div className="flex-1">
    <h2 className="text-2xl font-semibold mb-4">
      Your Amazon Cart is empty
    </h2>

    <Link to="/deals" className="text-blue-600 hover:underline">
      Shop today's deals
    </Link>

    <div className="mt-6 flex gap-4">
      <Link to="/signin">
        <button className="px-4 py-2 bg-yellow-400 rounded-3xl hover:bg-yellow-500">
          Sign in to your account
        </button>
      </Link>
      <Link to="/register">
        <button className="px-4 py-2 bg-gray-200 rounded-3xl hover:bg-gray-300">
          Sign up now
        </button>
      </Link>
    </div>
  </div>
</div>


      {/* Spacer box (example placeholder) */}
      <div className="bg-white mx-2 h-[100px]   w-3/4 my-4"></div>

      {/* Info paragraph */}
      <p className="text-xs text-black mx-6 my-4 text-left">
        The price and availability of items at Amazon.in are subject to change.
        The shopping cart is a temporary place to store a list of your items
        and reflects each item's most recent price.
        <br />
        Do you have a promotional code? We'll ask you to enter your claim code
        when it's time to pay.
      </p>

      {/* Recommendations box */}
      <div className="bg-white mx-2 my-3 p-6 rounded shadow ">
        <h3 className="text-lg font-semibold mb-3">
          See personalized recommendations
        </h3>

        <Link to="/signin">
          <button className="px-4 py-2 bg-yellow-400 rounded hover:bg-yellow-500">
            Sign in
          </button>
        </Link>

        <p className="mt-3">
          New customer?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Start here
          </Link>
        </p>
      </div>
    </div>    </Layout>

  );
};

export default Cart;
