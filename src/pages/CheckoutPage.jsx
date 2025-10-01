import React, { useState } from 'react'
import { useCart } from '../context/CartContext'
import api from '../utils/axios'

export default function CheckoutPage() {
  const { cartItems, clearCart } = useCart()
  const [form, setForm] = useState({ name: '', phone: '', area: '', payment: 'mpesa' })
  const total = cartItems.reduce((s, i) => s + i.price * i.quantity, 0)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await api.post('cart/checkout/', { ...form, items: cartItems })
      alert('Order placed successfully!')
      clearCart()
    } catch (err) {
      console.error(err)
      alert('Checkout failed')
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Checkout</h2>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
        <input type="text" name="name" placeholder="Your Name" required
          value={form.name} onChange={handleChange}
          className="w-full p-3 border rounded-lg" />
        <input type="text" name="phone" placeholder="Phone Number" required
          value={form.phone} onChange={handleChange}
          className="w-full p-3 border rounded-lg" />
        <input type="text" name="area" placeholder="Area / Location" required
          value={form.area} onChange={handleChange}
          className="w-full p-3 border rounded-lg" />
        <select name="payment" value={form.payment} onChange={handleChange} className="w-full p-3 border rounded-lg">
          <option value="mpesa">M-Pesa</option>
          <option value="card">Card</option>
        </select>
        <p className="font-bold text-lg">Total: KES {total}</p>
        <button type="submit" className="w-full py-3 bg-[#A656A6] text-white rounded-lg hover:bg-[#823C82] transition">
          Confirm & Pay
        </button>
      </form>
    </div>
  )
}
