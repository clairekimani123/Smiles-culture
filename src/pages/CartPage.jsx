import React from 'react'
import { useCart } from '../context/CartContext'
import { Link } from 'react-router-dom'

export default function CartPage() {
  const { cartItems, removeFromCart } = useCart()
  const total = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0)

  if (cartItems.length === 0) {
    return <div className="p-8 text-center text-lg font-medium">Your cart is empty.</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 font-serif">Your Cart</h2>
      <div className="grid gap-6">
        {cartItems.map((item, idx) => (
          <div key={idx} className="bg-purple-50 p-4 rounded-lg flex flex-col md:flex-row items-center md:items-start justify-between shadow">
            <img src={item.image} alt={item.name} className="w-32 h-32 object-cover rounded-md mb-4 md:mb-0" />
            <div className="flex-1 text-center md:text-left md:ml-4">
              <h3 className="font-semibold text-lg">{item.name}</h3>
              <p className="text-gray-600">KES {item.price} x {item.quantity}</p>
            </div>
            <button onClick={() => removeFromCart(item.productId)} className="text-red-600 hover:text-red-800 font-medium">
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-between items-center">
        <p className="text-xl font-bold">Total: KES {total}</p>
        <Link to="/checkout" className="px-6 py-3 bg-[#A656A6] text-white rounded-lg hover:bg-[#823C82] transition">
          Proceed to Checkout
        </Link>
      </div>
    </div>
  )
}
