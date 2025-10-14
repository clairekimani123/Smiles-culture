import React, { useState } from 'react'
import { useCart } from '../context/CartContext'
import api from '../utils/axios'
import { FaCcPaypal, FaCreditCard, FaMobileAlt } from 'react-icons/fa'

export default function CheckoutPage() {
  const { cartItems, clearCart } = useCart()
  const [form, setForm] = useState({ name: '', phone: '', area: '', payment: 'mpesa' })
  const total = cartItems.reduce((s, i) => s + i.price * i.quantity, 0)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await api.post('checkout/', { ...form, amount: total, items: cartItems })
      alert('Order placed successfully!')
      clearCart()
    } catch (err) {
      console.error(err)
      alert('Checkout failed')
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold font-serif text-center mb-8 text-[#A656A6]">Checkout</h2>
      <form
        onSubmit={handleSubmit}
        className="space-y-5 bg-white shadow-lg rounded-xl p-8 border border-purple-200"
      >
        <div>
          <label className="block text-gray-700 mb-2 font-semibold">Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your full name"
            required
            value={form.name}
            onChange={handleChange}
            className="w-full border-2 border-purple-300 rounded-lg p-3 focus:outline-none focus:border-[#A656A6] transition"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2 font-semibold">Phone Number</label>
          <input
            type="text"
            name="phone"
            placeholder="Enter phone number"
            required
            value={form.phone}
            onChange={handleChange}
            className="w-full border-2 border-purple-300 rounded-lg p-3 focus:outline-none focus:border-[#A656A6] transition"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2 font-semibold">Area / Location</label>
          <input
            type="text"
            name="area"
            placeholder="Enter area or location"
            required
            value={form.area}
            onChange={handleChange}
            className="w-full border-2 border-purple-300 rounded-lg p-3 focus:outline-none focus:border-[#A656A6] transition"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2 font-semibold">Payment Method</label>
          <select
            name="payment"
            value={form.payment}
            onChange={handleChange}
            className="w-full border-2 border-purple-300 rounded-lg p-3 focus:outline-none focus:border-[#A656A6] transition bg-white"
          >
            <option value="mpesa">
              M-Pesa
            </option>
            <option value="card">
              Card
            </option>
            <option value="paypal">
              PayPal
            </option>
          </select>

          <div className="flex items-center gap-4 mt-2 text-2xl text-[#A656A6]">
            <FaMobileAlt title="M-Pesa" />
            <FaCreditCard title="Card" />
            <FaCcPaypal title="PayPal" />
          </div>
        </div>

        <p className="font-bold text-lg text-gray-700">Total: <span className="text-[#A656A6]">KES {total}</span></p>

        <button
          type="submit"
          className="w-full py-3 bg-[#A656A6] text-white rounded-lg font-semibold hover:bg-[#823C82] transition"
        >
          Submit Order
        </button>
      </form>
    </div>
  )
}
