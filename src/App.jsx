import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductListPage from './pages/ProductListPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import { CartProvider } from './context/CartContext';
import { Toaster } from 'react-hot-toast';

// GA4 Page View Tracker
function GA4Tracker() {
  const location = useLocation();

  React.useEffect(() => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);

  return null;
}

export default function App() {
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <GA4Tracker />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductListPage />} />
            <Route path="/products/:id" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
          </Routes>
        </main>

        <Footer />

        {/* Toast Notifications */}
        <Toaster 
          position="top-center" 
          richColors 
          toastOptions={{
            success: {
              style: {
                background: '#A656A6',
                color: '#ffffff',
              },
              duration: 3000,
            },
            error: {
              style: {
                background: '#ef4444',
                color: '#ffffff',
              },
            },
          }}
        />
      </div>
    </CartProvider>
  );
}