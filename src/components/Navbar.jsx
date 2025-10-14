import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaShoppingCart } from 'react-icons/fa'
import { useCart } from '../context/CartContext'

export default function Navbar() {
  const { cartItems } = useCart()
  const navigate = useNavigate()

  return (
    <nav className="bg-[#A656A6] text-white shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-4xl font-bold font-serif">
          Smiles Culture
        </Link>

        <div className="flex items-center gap-8">
          <Link to="/products" className="hover:text-purple-200 text-xl font-semibold">Products</Link>
          <Link to="/products?cat=women" className="hover:text-purple-200 text-xl font-semibold">Women</Link>
          <Link to="/products?cat=men" className="hover:text-purple-200 text-xl font-semibold">Men</Link>
          <Link to="/products?cat=unisex" className="hover:text-purple-200 text-xl font-semibold">Unisex</Link>

          {/* Larger Cart Icon */}
          <Link to="/cart" className="relative text-3xl">
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
