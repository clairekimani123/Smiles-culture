// src/api/mpesaPoll.js
import { api } from './index';

export async function pollPaymentStatus(checkoutId, {
  intervalMs = 3000,
  timeoutMs = 90000,
} = {}) {
  const start = Date.now();

  while (Date.now() - start < timeoutMs) {
    try {
      const s = await api.getMpesaStatus(checkoutId);

      // If status resolves, return it immediately
      if (s.status === 'success' || s.status === 'failed' || s.status === 'timeout') {
        return s;
      }
      
      // If still 'initiated', loop will wait and try again
    } catch (err) {
      // axios error handling
      if (err?.response?.status === 404) return { status: 'unknown' };
      console.warn('Poll error:', err?.message || err);
    }

    await new Promise((r) => setTimeout(r, intervalMs));
  }

  return { status: 'timeout', result_desc: 'No confirmation from MPesa' };
}