import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaShoppingCart } from 'react-icons/fa'
import { useCart } from '../context/CartContext'
import logo from '../assets/smiles-culture-logo.svg'  // make sure to place it in /src/assets/

export default function Navbar() {
  const { cartItems } = useCart()
  const navigate = useNavigate()

  return (
    <nav className="bg-[#A656A6] text-white shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo and Brand */}
        <div className="flex items-center gap-3">
          <img 
            src={logo} 
            alt="Smiles Culture Logo" 
            className="w-14 h-14 rounded-md border-2 border-white shadow-sm"
          />
          <Link to="/" className="text-3xl font-bold font-serif text-white hover:text-gray-200 transition">
            Smiles Culture
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-8">
          <Link to="/products" className="hover:text-purple-200 text-lg font-semibold">Products</Link>
          <Link to="/products?cat=women" className="hover:text-purple-200 text-lg font-semibold">Women</Link>
          <Link to="/products?cat=men" className="hover:text-purple-200 text-lg font-semibold">Men</Link>
          <Link to="/products?cat=unisex" className="hover:text-purple-200 text-lg font-semibold">Unisex</Link>

          {/* Cart Icon (enlarged) */}
          <Link to="/cart" className="relative text-3xl hover:text-purple-200 transition">
            <FaShoppingCart />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-white text-[#A656A6] rounded-full text-xs w-5 h-5 flex items-center justify-center font-bold">
                {cartItems.reduce((s, i) => s + i.quantity, 0)}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  )
}
