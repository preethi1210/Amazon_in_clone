import React from "react";
import CurrencyFormat from "react-currency-format";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Subtotal() {
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.cart);

  const totalPrice = items.reduce(
    (sum, item) => sum + item.productId.price * item.quantity,
    0
  );

  return (
    <div className="flex flex-col justify-between w-72 p-5 bg-gray-100 border border-gray-300 rounded-md">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p className="text-lg font-semibold">
              Subtotal ({items.length} items): <strong>{value}</strong>
            </p>
            <small className="flex items-center mt-2 text-sm">
              <input
                type="checkbox"
                className="mr-2 accent-yellow-400 w-4 h-4"
              />
              This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={totalPrice}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"₹"}
      />

      <button
        onClick={() => navigate("/checkout")}
        className="mt-4 w-full h-10 bg-yellow-400 hover:bg-yellow-300 text-black font-semibold rounded border border-yellow-600"
      >
        Proceed to Checkout
      </button>
    </div>
  );
}

export default Subtotal;
