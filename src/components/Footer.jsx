import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#A656A6] text-white py-6 mt-12">
      <div className="max-w-6xl mx-auto text-center text-sm">
        <p>&copy; {new Date().getFullYear()} ReactShop. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
