import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function ProductCard({ product, onAdd }) {
  const [quantity, setQuantity] = useState(1)

  const inStock = product.stock === undefined || product.stock === null || product.stock > 0

  const handleAdd = () => {
    if (!inStock) return
    onAdd({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image_url,   // ← was product.image, now product.image_url
      quantity,
    })
    setQuantity(1)
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-4 flex flex-col transform hover:scale-105 hover:shadow-lg transition duration-100">
      <img
        src={product.image_url}          // ← was product.image, now product.image_url
        alt={product.name}
        className="h-150 w-full object-cover rounded mb-4"
      />

      {/* Clickable product name → navigates to product detail page */}
      <Link
        to={`/products/${product.id}`}
        className="font-semibold text-lg text-gray-800 hover:text-[#A656A6] hover:underline transition"
      >
        {product.name}
      </Link>

      <p className="text-gray-600 text-sm mt-1">{product.description}</p>
      <p className="font-bold text-brand mt-2">KES {product.price}</p>

      {/* Quantity Selector — only shown when in stock */}
      {inStock && (
        <div className="flex items-center gap-3 mt-3">
          <button
            onClick={() => setQuantity(q => Math.max(1, q - 1))}
            className="w-8 h-8 rounded-full border border-[#A656A6] text-[#A656A6] font-bold hover:bg-[#A656A6] hover:text-white transition"
          >
            −
          </button>
          <span className="font-semibold text-gray-800 w-4 text-center">{quantity}</span>
          <button
            onClick={() => setQuantity(q => q + 1)}
            className="w-8 h-8 rounded-full border border-[#A656A6] text-[#A656A6] font-bold hover:bg-[#A656A6] hover:text-white transition"
          >
            +
          </button>
        </div>
      )}

      {/* Add to Cart / Out of Stock */}
      <button
        onClick={handleAdd}
        disabled={!inStock}
        className={`mt-3 px-4 py-2 rounded-full text-white transition ${
          inStock
            ? 'bg-[#A656A6] hover:bg-[#823C82] cursor-pointer'
            : 'bg-gray-400 cursor-not-allowed'
        }`}
      >
        {inStock ? 'Add to Cart' : 'Out of Stock'}
      </button>
    </div>
  )
}