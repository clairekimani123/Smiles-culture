import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaShoppingCart } from 'react-icons/fa'
import { useCart } from '../context/CartContext'

export default function Navbar() {
  const { cartItems } = useCart()
  const navigate = useNavigate()
  const token = localStorage.getItem('access_token') || localStorage.getItem('access')

  const handleLogout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('phone')
    navigate('/login')
  }

  return (
    <nav className="bg-white border-b shadow-sm sticky top-0 z-40">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-brand">Smiles Culture</Link>
        <div className="flex items-center gap-6">
          <Link to="/products" className="hover:text-brand">Products</Link>
          <Link to="/products?cat=women" className="hover:text-brand">Women</Link>
          <Link to="/products?cat=men" className="hover:text-brand">Men</Link>
          <Link to="/products?cat=unisex" className="hover:text-brand">Unisex</Link>
          <Link to="/cart" className="relative text-lg">
            <FaShoppingCart />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-brand text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                {cartItems.reduce((s,i)=>s+i.quantity,0)}
              </span>
            )}
          </Link>
          {token ? (
            <button onClick={handleLogout} className="text-sm text-gray-600">Logout</button>
          ) : (
            <Link to="/login" className="text-sm text-gray-600">Login</Link>
          )}
        </div>
      </div>
    </nav>
  )
}
