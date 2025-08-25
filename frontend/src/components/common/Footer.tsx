import React from 'react';
import { Leaf, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-emerald-500" />
              <span className="text-2xl font-bold">Urvann</span>
            </div>
            <p className="text-gray-400">
              Bringing nature closer to you with our premium collection of plants.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="/shop" className="hover:text-white transition-colors">Shop</a></li>
              <li><a href="/cart" className="hover:text-white transition-colors">Cart</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold mb-4">Categories</h3>
            <ul className="space-y-2 text-gray-400">
              <li><span className="hover:text-white transition-colors cursor-pointer">Indoor Plants</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Outdoor Plants</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Succulents</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Air Purifying</span></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Email: info@urvann.com</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Support: 24/7 Available</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p className="flex items-center justify-center space-x-1">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-red-500" />
            <span>by Urvann Team © 2025</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;