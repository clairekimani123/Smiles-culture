import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../api';

const STATUS_COPY = {
  pending:            'Waiting for payment confirmation…',
  paid:               '✅ Payment received! We are preparing your order.',
  awaiting_timeframe: '👗 Being made to order — our designer will email you a timeframe.',
  awaiting_deposit:   '💳 Deposit required to start production — check your email.',
  in_production:      '✂️ Your order is being made!',
  awaiting_balance:   '📦 Your piece is ready! Balance due — check your email.',
  shipped:            '🚚 On its way!',
  delivered:          '✨ Delivered. Enjoy!',
  cancelled:          'This order was cancelled.',
  refunded:           'This order was refunded.',
};

export default function OrderDetailPage() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.getOrder(id)
      .then(setOrder)
      .catch((err) => {
        console.error(err);
        setError('Could not load order details.');
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="text-center py-20 text-[#A656A6]">Loading order…</div>;
  if (error || !order) return <div className="text-center py-20 text-red-500">{error || 'Order not found'}</div>;

  return (
    <div className="container mx-auto px-4 py-10 max-w-3xl">
      <div className="bg-white shadow-lg rounded-xl p-8 border border-purple-200">
        
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h2 className="text-2xl font-bold text-[#A656A6]">Order #{order.id}</h2>
          <span className="text-gray-500 text-sm">{new Date(order.created_at).toLocaleDateString()}</span>
        </div>

        {/* Status Banner */}
        <div className="bg-purple-50 p-4 rounded-lg mb-6 text-center border border-purple-100">
          <p className="text-lg font-semibold text-gray-800">
            {STATUS_COPY[order.status] || order.status}
          </p>
          
          {order.target_completion_date && (
            <p className="text-sm text-gray-600 mt-2">
              Target completion: <strong>{order.target_completion_date}</strong>
            </p>
          )}

          {order.owner_note_to_customer && (
            <p className="text-sm text-gray-600 mt-2 italic border-l-4 border-[#A656A6] pl-3 text-left">
              "{order.owner_note_to_customer}"
            </p>
          )}
        </div>

        {/* Deposit / Balance Pay Buttons (if applicable) */}
        {order.status === 'awaiting_deposit' && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-center">
            <p className="font-semibold text-yellow-800 mb-2">Deposit Required: KES {order.deposit_amount}</p>
            <Link 
              to={`/orders/${order.id}/pay?purpose=deposit`}
              className="inline-block px-6 py-2 bg-[#A656A6] text-white rounded hover:bg-[#823C82] transition"
            >
              Pay Deposit Now
            </Link>
          </div>
        )}

        {order.status === 'awaiting_balance' && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-center">
            <p className="font-semibold text-yellow-800 mb-2">Balance Due: KES {order.balance_amount}</p>
            <Link 
              to={`/orders/${order.id}/pay?purpose=balance`}
              className="inline-block px-6 py-2 bg-[#A656A6] text-white rounded hover:bg-[#823C82] transition"
            >
              Pay Balance Now
            </Link>
          </div>
        )}

        {/* Items List */}
        <h3 className="text-lg font-bold text-gray-800 mb-4">Items</h3>
        <div className="space-y-4">
          {order.items.map((item) => (
            <div key={item.id} className="flex justify-between items-center border-b pb-2">
              <div>
                <p className="font-medium text-gray-800">{item.product_name}</p>
                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                {item.was_out_of_stock_at_purchase && (
                  <span className="text-xs bg-purple-100 text-[#A656A6] px-2 py-1 rounded-full mt-1 inline-block">
                    Made to order
                  </span>
                )}
              </div>
              <p className="font-semibold text-[#A656A6]">KES {item.line_total}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 text-right">
          <p className="text-xl font-bold text-gray-800">
            Total: <span className="text-[#A656A6]">KES {order.total}</span>
          </p>
        </div>

        <div className="mt-8 text-center">
          <Link to="/products" className="text-[#A656A6] hover:underline font-medium">
            ← Continue Shopping
          </Link>
        </div>

      </div>
    </div>
  );
}