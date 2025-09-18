import React from "react";

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="bg-white  border-t-4 border-[#A656A6] rounded-xl shadow-sm hover:shadow-lg transition duration-300">
      <img
        src={product.image_url || "https://via.placeholder.com/150"}
        alt={product.name}
        className="w-full h-52 object-cover rounded-t-xl"
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-1">{product.name}</h2>
        <p className="text-[#A656A6] font-bold mb-2">${parseFloat(product.price).toFixed(2)}</p>
        <p className="text-sm text-gray-500 mb-4 line-clamp-2">{product.description}</p>
        <button
          onClick={() => onAddToCart(product)}
          className="w-full bg-[#A656A6] hover:bg-[#823C82] text-white font-semibold py-2 rounded-lg transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
