import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../utils/axios'
import { useCart } from '../context/CartContext'

export default function ProductDetailPage(){
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const { addToCart } = useCart()

  useEffect(()=>{
    api.get(`products/${id}/`).then(r => setProduct(r.data)).catch(console.error)
  }, [id])

  if (!product) return <div className="p-8">Loading...</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <img src={product.image_url || '/placeholder.png'} alt={product.name} className="w-full rounded shadow"/>

        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-brand text-2xl font-bold mb-4">KES {Number(product.price).toFixed(2)}</p>
          <p className="mb-6 text-gray-700">{product.description}</p>
          <div className="flex gap-4">
            <button onClick={()=>addToCart(product,1)} className="px-6 py-3 bg-brand text-white rounded">Add to cart</button>
            <button onClick={()=>window.location.href='/cart'} className="px-6 py-3 border rounded">Go to cart</button>
          </div>
        </div>
      </div>
    </div>
  )
}
