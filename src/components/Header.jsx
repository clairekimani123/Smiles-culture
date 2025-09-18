import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../context/CartContext';

const Header = () => {
  const { getCartItemCount } = useCart();

  return (
    <header className="bg-brand text-white shadow">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        <Link to="/" className="text-2xl font-bold hover:text-brand-light">
          Shop With Us
        </Link>
        <nav className="space-x-6 flex items-center">
          <Link to="/" className="hover:text-brand-light">Home</Link>
          <Link to="/add-product" className="hover:text-brand-light">Sell</Link>
          <Link to="/cart" className="relative hover:text-brand-light flex items-center">
            <FaShoppingCart />
            {getCartItemCount() > 0 && (
              <span className="ml-1 bg-white text-brand font-bold text-xs rounded-full px-2 py-0.5">
                {getCartItemCount()}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
