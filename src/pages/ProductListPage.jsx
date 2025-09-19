import React, { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import { useCart } from '../context/CartContext'
import api from '../utils/axios'
import { useSearchParams } from 'react-router-dom'

export default function ProductListPage(){
  const [products, setProducts] = useState([])
  const { addToCart } = useCart()
  const [q] = useSearchParams()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get('products/')
        setProducts(res.data)
      } catch (err) { console.error(err) }
    }
    fetchProducts()
  }, [])

  const cat = q.get('cat')
  const filtered = cat ? products.filter(p => (p.category || '').toLowerCase() === cat.toLowerCase()) : products

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center text-brand mb-8">Explore Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtered.map(p => <ProductCard key={p.id} product={p} onAdd={addToCart} />)}
      </div>
    </div>
  )
}
