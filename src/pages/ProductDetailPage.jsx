import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../utils/axios'
import { useCart } from '../context/CartContext'

export default function ProductDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()

  useEffect(() => {
    api.get(`products/${id}/`).then(r => setProduct(r.data)).catch(console.error)
  }, [id])

  if (!product) return <div className="p-8">Loading...</div>

  const inStock = product.stock === undefined || product.stock === null || product.stock > 0

  const handleAdd = () => {
    if (!inStock) return
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image_url || product.image,
      quantity,
    })
    setQuantity(1)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <img
          src={product.image_url || product.image || '/placeholder.png'}
          alt={product.name}
          className="w-full rounded shadow object-cover"
        />

        <div>
          <h1 className="text-3xl font-bold mb-2 text-gray-800">{product.name}</h1>
          <p className="text-[#A656A6] text-2xl font-bold mb-4">
            KES {Number(product.price).toFixed(2)}
          </p>
          <p className="mb-6 text-gray-700">{product.description}</p>

          {/* Stock badge */}
          <span className={`inline-block text-sm font-medium px-3 py-1 rounded-full mb-4 ${
            inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'
          }`}>
            {inStock ? 'In Stock' : 'Out of Stock'}
          </span>

          {/* Quantity Selector */}
          {inStock && (
            <div className="flex items-center gap-3 mb-6">
              <span className="text-gray-700 font-medium">Quantity:</span>
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="w-9 h-9 rounded-full border border-[#A656A6] text-[#A656A6] font-bold hover:bg-[#A656A6] hover:text-white transition"
              >
                −
              </button>
              <span className="font-semibold text-gray-800 w-6 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(q => q + 1)}
                className="w-9 h-9 rounded-full border border-[#A656A6] text-[#A656A6] font-bold hover:bg-[#A656A6] hover:text-white transition"
              >
                +
              </button>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex gap-4 flex-wrap">
            <button
              onClick={handleAdd}
              disabled={!inStock}
              className={`px-6 py-3 rounded-lg text-white font-medium transition ${
                inStock
                  ? 'bg-[#A656A6] hover:bg-[#823C82]'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              {inStock ? 'Add to Cart' : 'Out of Stock'}
            </button>

            <button
              onClick={() => navigate('/cart')}
              className="px-6 py-3 border border-[#A656A6] text-[#A656A6] rounded-lg hover:bg-[#A656A6] hover:text-white transition font-medium"
            >
              Go to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}