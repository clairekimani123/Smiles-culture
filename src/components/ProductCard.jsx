import React from 'react'

export default function ProductCard({ product, onAdd }) {
  return (
    <div className="bg-white rounded shadow p-4 flex flex-col">
      <img 
        src={product.image} 
        alt={product.name} 
        className="h-48 w-full object-cover rounded mb-4"
      />
      <h3 className="font-semibold">{product.name}</h3>
      <p className="text-gray-600">{product.description}</p>
      <p className="font-bold text-brand mt-2">KES {product.price}</p>
      
      <button 
        onClick={() => onAdd({
          productId: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1
        })}
        className="mt-auto px-4 py-2 rounded bg-brand text-white"
      >
        Add to Cart
      </button>
    </div>
  )
}
