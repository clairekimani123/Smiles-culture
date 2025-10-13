import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaShoppingCart } from 'react-icons/fa'
import { useCart } from '../context/CartContext'

export default function Navbar() {
  const { cartItems } = useCart()
  const navigate = useNavigate()
  // const token = localStorage.getItem('access_token') || localStorage.getItem('access')

  // const handleLogout = () => {
  //   localStorage.removeItem('access_token')
  //   localStorage.removeItem('refresh_token')
  //   localStorage.removeItem('phone')
  //   navigate('/login')
  // }

  return (
    <nav className="bg-[#A656A6] text-white shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo / Brand Name */}
        <Link to="/" className="text-5xl font-bold font-serif mb-4">
          Smiles Culture
        </Link>

        {/* Links */}
        <div className="flex items-center gap-6">
          <Link to="/products" className="hover:text-purple-200 text-2xl font-bold font-serif mb-4 transition">Products</Link>
          <Link to="/products?cat=women" className="hover:text-purple-200 text-2xl font-bold font-serif mb-4 transition">Women</Link>
          <Link to="/products?cat=men" className="hover:text-purple-200 text-2xl font-bold font-serif mb-4 transition">Men</Link>
          <Link to="/products?cat=unisex" className="hover:text-purple-200 text-2xl font-bold font-serif mb-4 transition">Unisex</Link>

          {/* Cart */}
          <Link to="/cart" className="relative text-lg">
            <FaShoppingCart />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-white text-[#A656A6] rounded-full text-xs w-5 h-5 flex items-center justify-center font-bold">
                {cartItems.reduce((s, i) => s + i.quantity, 0)}
              </span>
            )}
          </Link>

          {/* Auth
          {token ? (
            <button onClick={handleLogout} className="text-sm hover:text-purple-200 transition">
              Logout
            </button>
          ) : (
            <Link to="/login" className="text-sm hover:text-purple-200 transition">
              Login
            </Link>
          )} */}
        </div>
      </div>
    </nav>
  )
}
