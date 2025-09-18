import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import api from "../utils/axios";

const CartPage = () => {
  const { cartItems = [], removeFromCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const total = cartItems.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
    0
  );

  const handleCheckout = async () => {
    setLoading(true);
    setMessage("");

    try {
      const phone = localStorage.getItem("phone");
      await api.post("/create-payment/", {
        phone,
        amount: total,
      });

      setMessage("✅ STK Push sent. Please check your phone.");
    } catch (err) {
      console.error(err);
      setMessage("❌ Checkout failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-600">🛒 Your cart is empty.</p>
      ) : (
        <>
          {/* Cart Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white shadow-md rounded-lg p-4 flex flex-col"
              >
                {/* Product Image */}
                <img
                  src={item.image || "/placeholder.png"} // fallback if image missing
                  alt={item.name}
                  className="h-40 w-full object-cover rounded-md mb-4"
                />

                {/* Product Details */}
                <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
                <p className="text-gray-600 mb-2">
                  Quantity: <span className="font-medium">{item.quantity}</span>
                </p>
                <p className="text-purple-700 font-bold mb-4">
                  KES {item.price * item.quantity}
                </p>

                {/* Remove Button */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 mt-auto"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Total + Checkout */}
          <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow">
            <h3 className="text-xl font-semibold">
              Total: <span className="text-purple-700">KES {total}</span>
            </h3>
            <button
              onClick={handleCheckout}
              disabled={loading}
              className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
            >
              {loading ? "Processing..." : "Checkout"}
            </button>
          </div>

          {/* Status Message */}
          {message && <p className="mt-4 text-center">{message}</p>}
        </>
      )}
    </div>
  );
};

export default CartPage;
