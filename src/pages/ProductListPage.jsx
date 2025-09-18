import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext";

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/products/")
      .then((res) => res.json())
      .then((data) => {
        const normalized = data.map((p) => ({
          ...p,
          image_url: p.image_url || p.image || "https://via.placeholder.com/300",
          price: typeof p.price === "string" ? parseFloat(p.price) : p.price,
        }));
        setProducts(normalized);
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  return (
    <div className="bg-purple-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-center text-[#A656A6]">
          Explore Our Collection
        </h1>
        {products.length === 0 ? (
          <p className="text-center text-gray-500">No products available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={() => addToCart({ ...product, quantity: 1 })}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductListPage;
