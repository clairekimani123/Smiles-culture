import React from 'react'
import { useCart } from '../context/CartContext'
import { Link } from 'react-router-dom'

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity } = useCart()
  const total = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0)

  if (cartItems.length === 0) {
    return (
      <div className="p-8 text-center text-lg font-medium">
        Your cart is empty.
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-8 font-serif text-center text-[#A656A6]">
        Your Cart
      </h2>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {cartItems.map((item, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition transform hover:scale-105"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-150 object-cover"
            />
            <div className="p-4">
              {/* Clickable name → product detail */}
              <Link
                to={`/products/${item.productId}`}
                className="font-semibold text-lg text-gray-800 hover:text-[#A656A6] hover:underline transition"
              >
                {item.name}
              </Link>

              <p className="text-gray-600 text-sm mt-1">{item.description || ''}</p>

              <p className="text-[#A656A6] font-bold mt-2">
                KES {(item.price * item.quantity).toFixed(2)}
              </p>
              <p className="text-gray-500 text-xs">KES {item.price} each</p>

              {/* Quantity controls */}
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
                className="mt-3 text-red-600 hover:text-red-800 font-medium text-sm"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Total and Checkout */}
      <div className="mt-10 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xl font-bold text-gray-800">
          Total: <span className="text-[#A656A6]">KES {total.toFixed(2)}</span>
        </p>
        <Link
          to="/checkout"
          className="px-8 py-3 bg-[#A656A6] text-white rounded-lg hover:bg-[#823C82] transition font-medium"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  )
}