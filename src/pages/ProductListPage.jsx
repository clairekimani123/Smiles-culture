import React, { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import { useCart } from '../context/CartContext'
import api from '../utils/axios'
import { useSearchParams } from 'react-router-dom'

// Skeleton card shown while products are loading
function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 flex flex-col animate-pulse">
      {/* Image placeholder */}
      <div className="h-64 w-full bg-gray-200 rounded mb-4" />
      {/* Name placeholder */}
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
      {/* Description placeholder */}
      <div className="h-3 bg-gray-200 rounded w-full mb-1" />
      <div className="h-3 bg-gray-200 rounded w-2/3 mb-3" />
      {/* Price placeholder */}
      <div className="h-4 bg-gray-200 rounded w-1/3 mb-4" />
      {/* Button placeholder */}
      <div className="h-9 bg-gray-200 rounded-full mt-auto" />
    </div>
  )
}

export default function ProductListPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const { addToCart } = useCart()
  const [q] = useSearchParams()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get('products/')
        setProducts(res.data)
      } catch (err) {
        console.error(err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  const cat = q.get('cat')
  const filtered = cat
    ? products.filter(p => (p.category || '').toLowerCase() === cat.toLowerCase())
    : products

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center text-brand mb-8">Explore Products</h2>

      {/* Error state */}
      {error && (
        <div className="text-center text-red-500 font-medium py-10">
          Failed to load products. Please try again later.
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Show 8 skeleton cards while loading */}
        {loading
          ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
          : filtered.map(p => <ProductCard key={p.id} product={p} onAdd={addToCart} />)
        }
      </div>
    </div>
  )
}