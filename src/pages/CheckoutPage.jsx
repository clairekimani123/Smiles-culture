import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { api } from '../api';               // ← NEW: our API wrapper
import { pollPaymentStatus } from '../api/mpesaPoll'; // ← NEW: the polling logic
import { FaCcPaypal, FaCreditCard, FaMobileAlt } from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function CheckoutPage() {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [form, setForm] = useState({ 
    name: '', 
    phone: '', 
    area: '', 
    email: '', 
    payment: 'mpesa' 
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [waitingForPin, setWaitingForPin] = useState(false); // ← NEW state

  const total = cartItems.reduce((s, i) => s + i.price * i.quantity, 0);

  const handleChange = (e) => 
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setWaitingForPin(false);

    try {
      // 1. Create the order in the backend (Status: Pending)
      const orderPayload = {
        name: form.name,
        phone: form.phone,
        email: form.email,
        area: form.area,
        total: total.toFixed(2),
        // Map frontend cart structure to backend OrderItem structure
        items: cartItems.map((item) => ({
          product: item.productId,  // Backend expects 'product'
          quantity: item.quantity,
          unit_price: item.price.toFixed(2),
        })),
      };

      const order = await api.createOrder(orderPayload);

      if (form.payment === 'mpesa') {
        toast.loading('Sending M-Pesa prompt to your phone...', {
          id: 'mpesa-toast',
          duration: Infinity,
        });

        // 2. Fire the STK Push (Backend returns 202 + checkout_request_id)
        const stk = await api.initiateMpesa(order.id, { phone: form.phone });
        
        toast.dismiss('mpesa-toast');

        // 3. We now wait for the user to enter their PIN
        setWaitingForPin(true);
        setLoading(false); // Stop the button spinner, show PIN message

        // 4. Poll the backend until it says success or failed
        const result = await pollPaymentStatus(stk.checkout_request_id);

        if (result.status === 'success') {
          toast.success('Payment received!', { duration: 5000 });
          clearCart();
          navigate(`/orders/${order.id}?paid=1`); // Go to order page, not home
        } else if (result.status === 'failed') {
          setError(result.result_desc || 'Payment was cancelled or failed. Please try again.');
          setWaitingForPin(false);
        } else {
          setError('We did not get a confirmation from M-Pesa. Check your messages.');
          setWaitingForPin(false);
        }
      } else {
        // Handle other payment methods (Card/PayPal)...
        // For now, just navigate to the order confirmation page
        clearCart();
        navigate(`/orders/${order.id}`);
      }

    } catch (err) {
      console.error(err);
      setError(err.response?.data?.detail || 'Checkout failed. Please try again.');
      toast.error('Checkout failed.');
      setWaitingForPin(false);
      setLoading(false);
    } 
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold font-serif text-center mb-8 text-[#A656A6]">
        Checkout
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white shadow-lg rounded-xl p-8 border border-purple-200">
        
        {/* Form Fields (Name, Phone, Email, Area) */}
        <div>
          <label className="block text-gray-700 mb-2 font-semibold">Full Name</label>
          <input
            type="text" name="name" placeholder="Enter your full name" required
            value={form.name} onChange={handleChange}
            className="w-full border-2 border-purple-300 rounded-lg p-3 focus:outline-none focus:border-[#A656A6] transition"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2 font-semibold">Phone Number</label>
          <input
            type="text" name="phone" placeholder="e.g. 2547XXXXXXXX" required
            value={form.phone} onChange={handleChange}
            className="w-full border-2 border-purple-300 rounded-lg p-3 focus:outline-none focus:border-[#A656A6] transition"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2 font-semibold">Email (Optional)</label>
          <input
            type="email" name="email" placeholder="For order receipts"
            value={form.email} onChange={handleChange}
            className="w-full border-2 border-purple-300 rounded-lg p-3 focus:outline-none focus:border-[#A656A6] transition"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2 font-semibold">Area / Location</label>
          <input
            type="text" name="area" placeholder="Enter area or location" required
            value={form.area} onChange={handleChange}
            className="w-full border-2 border-purple-300 rounded-lg p-3 focus:outline-none focus:border-[#A656A6] transition"
          />
        </div>

        {/* Payment Method Section */}
        <div>
          <label className="block text-gray-700 mb-2 font-semibold">Payment Method</label>
          <select
            name="payment" value={form.payment} onChange={handleChange}
            className="w-full border-2 border-purple-300 rounded-lg p-3 focus:outline-none focus:border-[#A656A6] transition bg-white"
          >
            <option value="mpesa">M-Pesa</option>
            {/* <option value="card">Card</option> */}
          </select>
        </div>

        <p className="font-bold text-lg text-gray-700 text-center">
          Total: <span className="text-[#A656A6]">KES {total.toFixed(2)}</span>
        </p>

        {error && (
          <p className="text-red-600 text-center text-sm font-medium bg-red-50 p-3 rounded-lg">{error}</p>
        )}

        {/* NEW: The Waiting for PIN UI */}
        {waitingForPin && (
          <div className="bg-purple-50 border-2 border-purple-200 p-4 rounded-lg text-center animate-pulse">
            <p className="text-lg font-bold text-[#A656A6] mb-2">📱 Check your phone!</p>
            <p className="text-sm text-gray-700">Enter your M-Pesa PIN to complete the payment.</p>
            <p className="text-xs text-gray-500 mt-2">Do not close this page.</p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading || waitingForPin}
          className={`w-full py-3 rounded-lg font-semibold text-white transition ${
            (loading || waitingForPin) ? 'bg-purple-300 cursor-not-allowed' : 'bg-[#A656A6] hover:bg-[#823C82]'
          }`}
        >
          {loading ? 'Processing...' : waitingForPin ? 'Waiting for M-Pesa...' : 'Submit Order'}
        </button>
      </form>
    </div>
  );
}