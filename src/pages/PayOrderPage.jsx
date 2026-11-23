import React, { useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { api } from '../api';
import { pollPaymentStatus } from '../api/mpesaPoll';
import toast from 'react-hot-toast';

export default function PayOrderPage() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const purpose = searchParams.get('purpose') || 'deposit';
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const [error, setError] = useState('');

  const handlePay = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const stk = await api.initiateMpesa(id, { phone, purpose });
      setWaiting(true);
      setLoading(false);

      const result = await pollPaymentStatus(stk.checkout_request_id);

      if (result.status === 'success') {
        toast.success('Payment successful!');
        navigate(`/orders/${id}?paid=1`);
      } else {
        setError(result.result_desc || 'Payment failed.');
        setWaiting(false);
      }
    } catch (err) {
      setError(err.response?.data?.detail || 'Payment initiation failed.');
      setLoading(false);
      setWaiting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-20 max-w-md text-center">
      <h2 className="text-2xl font-bold text-[#A656A6] mb-6 capitalize">Pay {purpose}</h2>
      
      <form onSubmit={handlePay} className="bg-white shadow-lg rounded-xl p-8 border border-purple-200">
        <input
          type="text"
          placeholder="Enter M-Pesa Phone Number"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border-2 border-purple-300 rounded-lg p-3 mb-4 focus:outline-none focus:border-[#A656A6]"
        />

        {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}

        {waiting && (
          <div className="bg-purple-50 p-4 rounded-lg mb-4 animate-pulse border border-purple-200">
            <p className="font-bold text-[#A656A6]">📱 Check your phone!</p>
            <p className="text-sm text-gray-700 mt-1">Enter your M-Pesa PIN to complete payment.</p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading || waiting}
          className="w-full py-3 bg-[#A656A6] text-white rounded-lg font-semibold hover:bg-[#823C82] transition disabled:bg-purple-300"
        >
          {loading ? 'Processing...' : waiting ? 'Waiting for M-Pesa...' : `Pay with M-Pesa`}
        </button>
      </form>
    </div>
  );
}