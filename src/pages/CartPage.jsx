import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const total = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);

  // Empty cart state
  if (cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center">
        <div className="text-6xl mb-6">🛒</div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Your cart is empty</h2>
        <p className="text-gray-600 mb-8 max-w-md">
          Looks like you haven't added anything yet. Start shopping to fill your cart!
        </p>
        <Link
          to="/products"
          className="px-8 py-3 bg-[#A656A6] text-white rounded-full hover:bg-[#823C82] transition font-medium"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-8 font-serif text-center text-[#A656A6]">
        Your Cart ({cartItems.length} items)
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {cartItems.map((item) => (
          <div
            key={item.productId}   // ← Better key than index
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition transform hover:scale-105"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-150 object-cover"
            />
            <div className="p-4">
              <Link
                to={`/products/${item.productId}`}
                className="font-semibold text-lg text-gray-800 hover:text-[#A656A6] hover:underline transition"
              >
                {item.name}
              </Link>

              <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                {item.description || ''}
              </p>

              <p className="text-[#A656A6] font-bold mt-2">
                KES {(item.price * item.quantity).toFixed(2)}
              </p>
              <p className="text-gray-500 text-xs">KES {item.price} each</p>

              <div className="flex items-center gap-3 mt-3">
                <button
                  onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                  className="w-8 h-8 rounded-full border border-[#A656A6] text-[#A656A6] font-bold hover:bg-[#A656A6] hover:text-white transition"
                >
                  −
                </button>
                <span className="font-semibold text-gray-800 w-4 text-center">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                  className="w-8 h-8 rounded-full border border-[#A656A6] text-[#A656A6] font-bold hover:bg-[#A656A6] hover:text-white transition"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => removeFromCart(item.productId)}
                className="mt-4 text-red-600 hover:text-red-800 font-medium text-sm"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 flex flex-col md:flex-row justify-between items-center gap-6 bg-white p-6 rounded-2xl shadow">
        <p className="text-2xl font-bold text-gray-800">
          Total: <span className="text-[#A656A6]">KES {total.toFixed(2)}</span>
        </p>
        
        <Link
          to="/checkout"
          className="px-10 py-4 bg-[#A656A6] text-white rounded-xl hover:bg-[#823C82] transition font-semibold text-lg"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
}