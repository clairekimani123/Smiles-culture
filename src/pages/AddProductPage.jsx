import React, { useState } from "react";

const AddProductPage = () => {
  const [form, setForm] = useState({ name: "", price: "", desc: "", img: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New Product:", form);
    alert("Product added!");
  };

  return (
    <div className="bg-purple-50 min-h-screen py-12">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-[#A656A6]">Add Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A656A6]"
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A656A6]"
          />
          <input
            type="text"
            name="img"
            placeholder="Image URL"
            value={form.img}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A656A6]"
          />
          <textarea
            name="desc"
            placeholder="Description"
            value={form.desc}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A656A6]"
          />
          <button
            type="submit"
            className="w-full py-3 bg-[#A656A6] text-white rounded-lg hover:bg-[#823C82] transition"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProductPage;
