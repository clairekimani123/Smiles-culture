import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-purple-50 min-h-screen">
      {/* Hero Section */}
      <section className="text-center py-20 bg-gradient-to-r from-[#A656A6] to-[#823C82] text-white">
        <h1 className="text-5xl font-bold mb-4">Welcome to Smile's Culture Shop</h1>
        <p className="text-lg mb-6">
          Discover amazing products, shop securely, and enjoy fast delivery.
        </p>
        <Link
          to="/products"
          className="px-8 py-3 bg-white text-[#A656A6] font-semibold rounded-full shadow hover:bg-gray-100 transition"
        >
          Shop Now
        </Link>
      </section>

      {/* Features */}
      <section className="grid md:grid-cols-3 gap-6 px-6 py-12 max-w-6xl mx-auto">
        {[
          { title: "Wide Selection", desc: "Browse through a variety of high-quality products tailored for you." },
          { title: "Secure Payment", desc: "Pay easily with MPesa STK push and enjoy peace of mind." },
          { title: "Fast Delivery", desc: "Get your orders delivered quickly and safely to your doorstep." }
        ].map((f, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition border-t-4 border-[#A656A6]">
            <h3 className="font-bold text-lg mb-2">{f.title}</h3>
            <p className="text-gray-600">{f.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Home;