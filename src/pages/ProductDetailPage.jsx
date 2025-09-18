import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ProductDetailPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/products/${id}/`)
      .then((res) => res.json())
      .then((data) => {
        setProduct({
          ...data,
          image_url: data.image_url || data.image || "https://via.placeholder.com/400",
          price: typeof data.price === "string" ? parseFloat(data.price) : data.price,
        });
      })
      .catch((err) => console.error("Error fetching product:", err));
  }, [id]);

  if (!product) {
    return <p className="text-center text-gray-500 mt-10">Loading product...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="grid md:grid-cols-2 gap-8">
        <img
          src={product.image_url}
          alt={product.name}
          className="rounded-lg shadow"
        />
        <div>
          <h2 className="text-3xl font-bold mb-2">{product.name}</h2>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-xl font-bold text-[#A656A6] mb-6">
            ${product.price}
          </p>
          <button
            onClick={() => addToCart({ ...product, quantity: 1 })}
            className="px-6 py-3 bg-[#A656A6] text-white rounded-lg hover:bg-[#823C82] transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
