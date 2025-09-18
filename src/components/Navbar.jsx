import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-[#A656A6] text-white shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        <h1 className="text-2xl font-bold tracking-wide">Smile's Culture Shop</h1>
        <div className="space-x-6">
          {["Home", "Products", "Cart", "Add Product"].map((item, i) => (
            <NavLink
              key={i}
              to={item === "Home" ? "/" : `/${item.replace(" ", "-").toLowerCase()}`}
              className={({ isActive }) =>
                isActive
                  ? "font-semibold border-b-2 border-white pb-1"
                  : "hover:text-purple-200 transition"
              }
            >
              {item}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
