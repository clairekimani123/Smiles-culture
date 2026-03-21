import React, { createContext, useContext, useState } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])

  const addToCart = (item) => {
    setCartItems(prev => {
      const existing = prev.find(p => p.productId === item.productId)
      if (existing) {
        return prev.map(p =>
          p.productId === item.productId
            ? { ...p, quantity: p.quantity + item.quantity }
            : p
        )
      }
      return [...prev, item]
    })
  }

  // Update quantity — removes item if quantity drops to 0
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      setCartItems(prev => prev.filter(p => p.productId !== productId))
    } else {
      setCartItems(prev =>
        prev.map(p =>
          p.productId === productId ? { ...p, quantity: newQuantity } : p
        )
      )
    }
  }

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(p => p.productId !== id))
  }

  const clearCart = () => setCartItems([])

  const getCartTotal = () => {
    return cartItems.reduce((acc, it) => acc + it.price * it.quantity, 0)
  }

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, getCartTotal }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}