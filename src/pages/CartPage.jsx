import React from 'react'
import { useCart } from '../context/CartContext'
import { Link } from 'react-router-dom'

export default function CartPage() {
  const { cartItems, removeFromCart } = useCart()
  const total = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0)

  if (cartItems.length === 0) {
    return <div className="p-8 text-center">Your cart is empty.</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Your Cart</h2>
      <div className="space-y-4">
        {cartItems.map((item, idx) => (
          <div key={idx} className="bg-blue-100 flex justify-between items-center border-b pb-2">
            <div className="flex items-center gap-4">
              <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm">KES {item.price} x {item.quantity}</p>
              </div>
            </div>
            <button onClick={() => removeFromCart(item.productId)} className="text-red-500 px-4 ">Remove</button>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-between items-center">
        <p className="text-xl font-bold">Total: KES {total}</p>
        <Link to="/checkout" className="px-6 py-3 bg-[#A656A6] text-white rounded-lg hover:bg-[#823C82] transition">
          Proceed to Checkout
        </Link>
      </div>
    </div>
  )
}
