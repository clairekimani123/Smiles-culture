import React from 'react'
import { Link } from 'react-router-dom'

export default function Home(){
  return (
    <div className="min-h-[60vh] bg-gradient-to-b from-white to-[#f7eff8]">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl font-bold text-brand mb-4">Smiles Culture — Shop the Movement</h1>
            <p className="mb-6 text-gray-700">Quality tees, hoodies and more — crafted for confidence.</p>
            <div className="flex gap-4">
              <Link to="/products?cat=women" className="px-6 py-3 bg-brand text-white rounded">Shop Women</Link>
              <Link to="/products?cat=men" className="px-6 py-3 border border-brand text-brand rounded">Shop Men</Link>
            </div>
          </div>
          <div>
            <img src="/hero.jpg" alt="hero" className="w-full rounded shadow-lg" />
          </div>
        </div>

        {/* quick category cards */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {['Women','Men','Unisex'].map(cat => (
            <Link key={cat} to={`/products?cat=${cat.toLowerCase()}`} className="bg-white p-6 rounded shadow hover:shadow-lg transition">
              <div className="text-lg font-semibold mb-2">{cat}</div>
              <p className="text-gray-500">Hand-picked collection.</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
