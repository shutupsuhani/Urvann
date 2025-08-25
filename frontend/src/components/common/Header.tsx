import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Leaf, User } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const Header: React.FC = () => {
  const location = useLocation();
  const { getCartItemsCount } = useCart();
  const cartItemsCount = getCartItemsCount();

  const isActive = (path: string) => location.pathname === path;
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 text-emerald-600 hover:text-emerald-700 transition-colors">
            <Leaf className="h-8 w-8" />
            <span className="text-2xl font-bold">Urvann</span>
          </Link>

          {/* Navigation */}
          {!isAdminRoute && (
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                to="/"
                className={`text-sm font-medium transition-colors hover:text-emerald-600 ${
                  isActive('/') ? 'text-emerald-600' : 'text-gray-700'
                }`}
              >
                Home
              </Link>
              <Link
                to="/shop"
                className={`text-sm font-medium transition-colors hover:text-emerald-600 ${
                  isActive('/shop') ? 'text-emerald-600' : 'text-gray-700'
                }`}
              >
                Shop
              </Link>
            </nav>
          )}

          {/* Admin Navigation */}
          {isAdminRoute && (
            <nav className="hidden md:flex items-center space-x-6">
              <Link
                to="/admin/dashboard"
                className={`text-sm font-medium transition-colors hover:text-emerald-600 ${
                  location.pathname.includes('/dashboard') ? 'text-emerald-600' : 'text-gray-700'
                }`}
              >
                Dashboard
              </Link>
              <Link
                to="/admin/plants"
                className={`text-sm font-medium transition-colors hover:text-emerald-600 ${
                  location.pathname.includes('/plants') ? 'text-emerald-600' : 'text-gray-700'
                }`}
              >
                Manage Plants
              </Link>
            </nav>
          )}

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {!isAdminRoute && (
              <Link
                to="/cart"
                className="relative p-2 text-gray-700 hover:text-emerald-600 transition-colors"
              >
                <ShoppingCart className="h-6 w-6" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </Link>
            )}
            
            {isAdminRoute ? (
              <Link
                to="/"
                className="flex items-center space-x-1 text-sm font-medium text-gray-700 hover:text-emerald-600 transition-colors"
              >
                <span>Exit Admin</span>
              </Link>
            ) : (
              <Link
                to="/admin/dashboard"
                className="flex items-center space-x-1 text-sm font-medium text-gray-700 hover:text-emerald-600 transition-colors"
              >
                <User className="h-4 w-4" />
                <span>Admin</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;