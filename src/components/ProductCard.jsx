import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function ProductCard({ product, onAdd }) {
  // const navigate = useNavigate()

  const handleAdd = () => {
    onAdd({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    })
    // navigate('/cart') // ✅ Redirect to cart after adding
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-4 flex flex-col transform hover:scale-105 hover:shadow-lg transition duration-100">
      <img 
        src={product.image} 
        alt={product.name} 
        className="h-150 w-full object-cover rounded mb-4"
      />
      <h3 className="font-semibold text-lg">{product.name}</h3>
      <p className="text-gray-600 text-sm">{product.description}</p>
      <p className="font-bold text-brand mt-2">KES {product.price}</p>
      
      <button 
        onClick={handleAdd}
        className="mt-auto px-4 py-2 rounded-full bg-[#A656A6] text-white hover:bg-[#823C82] transition"
      >
        Add to Cart
      </button>
    </div>
  )
}
