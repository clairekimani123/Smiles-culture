import React, { useState } from 'react'
import { useCart } from '../context/CartContext'
import api from '../utils/axios'

export default function CartPage(){
  const { cartItems, removeFromCart, clearCart, getCartTotal } = useCart()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const total = getCartTotal()
  const phone = localStorage.getItem('phone')

  const handleCheckout = async () => {
    if (!phone) { setMessage('Please set your phone in profile or login'); return }
    setLoading(true); setMessage('')
    try {
      const res = await api.post('create-payment/', { phone, amount: total })
      if (res.data.success) {
        setMessage('STK push sent. Check your phone for the prompt.')
        clearCart()
      } else {
        setMessage(res.data.message || 'Payment initiation failed')
      }
    } catch (err) {
      console.error(err)
      setMessage(err.response?.data || 'Checkout failed. Try again.')
    } finally { setLoading(false) }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-brand mb-6">Your Cart</h2>

      {cartItems.length === 0 ? <p>Your cart is empty.</p> : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {cartItems.map(it => (
              <div key={it.productId} className="bg-white rounded shadow p-4 flex flex-col">
                <img src={it.image} alt={it.name} className="h-48 w-full object-cover rounded mb-4"/>
                <h3 className="font-semibold">{it.name}</h3>
                <p className="text-gray-600">Quantity: {it.quantity}</p>
                <p className="font-bold text-brand mt-2">KES {(it.price * it.quantity).toFixed(2)}</p>
                <div className="mt-auto flex gap-2">
                  <button onClick={()=>removeFromCart(it.productId)} className="px-3 py-1 bg-red-500 text-white rounded">Remove</button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center bg-white p-4 rounded shadow">
            <div>
              <div className="text-lg">Total</div>
              <div className="text-2xl font-bold text-brand">KES {total.toFixed(2)}</div>
            </div>

            <div className="flex gap-4">
              <button onClick={clearCart} className="px-4 py-2 border rounded">Clear</button>
              <button onClick={handleCheckout} disabled={loading} className="px-6 py-2 rounded bg-brand text-white">
                {loading ? 'Processing...' : 'Checkout (M-Pesa)'}
              </button>
            </div>
          </div>

          {message && <p className="mt-4 text-center">{String(message)}</p>}
        </>
      )}
    </div>
  )
}
