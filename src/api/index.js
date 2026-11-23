// src/api/index.js
import axiosInstance from '../utils/axios';

export const api = {
  // Products
  getProducts: () => axiosInstance.get('products/').then((r) => r.data),
  getProduct: (id) => axiosInstance.get(`products/${id}/`).then((r) => r.data),

  // Orders
  // Note: using 'orders/' since baseURL already has 'api/'
  createOrder: (payload) => 
    axiosInstance.post('orders/', payload).then((r) => r.data),
  getOrder: (id) => 
    axiosInstance.get(`orders/${id}/`).then((r) => r.data),

  // MPesa
  initiateMpesa: (orderId, payload) =>
    axiosInstance.post(`mpesa/initiate/${orderId}/`, payload).then((r) => r.data),
  
  getMpesaStatus: (checkoutId) =>
    axiosInstance.get(`mpesa/status/${checkoutId}/`).then((r) => r.data),

    
}