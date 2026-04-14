import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import api from '../utils/axios';
import { FaCcPaypal, FaCreditCard, FaMobileAlt } from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function CheckoutPage() {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [form, setForm] = useState({ 
    name: '', 
    phone: '', 
    area: '', 
    payment: 'mpesa' 
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const total = cartItems.reduce((s, i) => s + i.price * i.quantity, 0);

  const handleChange = (e) => 
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Simulate M-Pesa prompt for better UX (you can improve this later with real STK Push)
      if (form.payment === 'mpesa') {
        toast.loading('Sending M-Pesa prompt to your phone...', {
          id: 'mpesa-toast',
          duration: Infinity,
        });

        // Call your backend
        await api.post('checkout/', { 
          ...form, 
          amount: total, 
          items: cartItems 
        });

        toast.success('Prompt sent! Please check your phone and enter your M-Pesa PIN.', {
          id: 'mpesa-toast',
          duration: 8000,
        });
      } else {
        await api.post('checkout/', { 
          ...form, 
          amount: total, 
          items: cartItems 
        });
      }

      clearCart();
      navigate('/', { state: { orderSuccess: true } });

    } catch (err) {
      console.error(err);
      setError('Checkout failed. Please check your details and try again.');
      toast.error('Payment initiation failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold font-serif text-center mb-8 text-[#A656A6]">
        Checkout
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white shadow-lg rounded-xl p-8 border border-purple-200">
        {/* ... (Name, Phone, Area fields remain the same) ... */}

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
            placeholder="e.g. 2547XXXXXXXX"
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

        {/* Payment Method Section (unchanged) */}
        <div>
          <label className="block text-gray-700 mb-2 font-semibold">Payment Method</label>
          <select
            name="payment"
            value={form.payment}
            onChange={handleChange}
            className="w-full border-2 border-purple-300 rounded-lg p-3 focus:outline-none focus:border-[#A656A6] transition bg-white"
          >
            <option value="mpesa">M-Pesa</option>
            <option value="card">Card</option>
            <option value="paypal">PayPal</option>
          </select>

          <div className="flex justify-center items-center gap-10 mt-4 text-[#A656A6]">
            <div className={`flex flex-col items-center transition ${form.payment === 'mpesa' ? 'opacity-100 scale-110' : 'opacity-40'}`}>
              <FaMobileAlt size={40} />
              <span className="text-sm mt-1 font-medium">M-Pesa</span>
            </div>
            <div className={`flex flex-col items-center transition ${form.payment === 'card' ? 'opacity-100 scale-110' : 'opacity-40'}`}>
              <FaCreditCard size={40} />
              <span className="text-sm mt-1 font-medium">Card</span>
            </div>
            <div className={`flex flex-col items-center transition ${form.payment === 'paypal' ? 'opacity-100 scale-110' : 'opacity-40'}`}>
              <FaCcPaypal size={40} />
              <span className="text-sm mt-1 font-medium">PayPal</span>
            </div>
          </div>
        </div>

        <p className="font-bold text-lg text-gray-700 text-center">
          Total: <span className="text-[#A656A6]">KES {total.toFixed(2)}</span>
        </p>

        {error && (
          <p className="text-red-600 text-center text-sm font-medium">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg font-semibold text-white transition ${
            loading ? 'bg-purple-300 cursor-not-allowed' : 'bg-[#A656A6] hover:bg-[#823C82]'
          }`}
        >
          {loading ? 'Processing Payment...' : 'Submit Order'}
        </button>
      </form>
    </div>
  );
}