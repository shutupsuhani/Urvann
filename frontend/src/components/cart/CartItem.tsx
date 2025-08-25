import React from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '../../types/Plant';
import { useCart } from '../../context/CartContext';
import { PLACEHOLDER_IMAGE } from '../../utils/constants';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const { plant, quantity } = item;

  const incrementQuantity = () => {
    updateQuantity(plant.id, quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      updateQuantity(plant.id, quantity - 1);
    }
  };

  const handleRemove = () => {
    removeFromCart(plant.id);
  };

  return (
    <div className="flex items-center space-x-4 py-6 border-b border-gray-200 last:border-b-0">
      {/* Plant Image */}
      <Link to={`/plants/${plant.id}`} className="flex-shrink-0">
        <img
          src={plant.image || PLACEHOLDER_IMAGE}
          alt={plant.name}
          className="w-20 h-20 object-cover rounded-lg hover:opacity-75 transition-opacity"
          onError={(e) => {
            (e.target as HTMLImageElement).src = PLACEHOLDER_IMAGE;
          }}
        />
      </Link>

      {/* Plant Details */}
      <div className="flex-1 space-y-2">
        <Link
          to={`/plants/${plant.id}`}
          className="text-lg font-medium text-gray-900 hover:text-emerald-600 transition-colors"
        >
          {plant.name}
        </Link>
        
        <div className="flex flex-wrap gap-1">
          {plant.categories.slice(0, 2).map((category, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs font-medium bg-emerald-100 text-emerald-700 rounded-full"
            >
              {category}
            </span>
          ))}
        </div>
        
        <p className="text-lg font-semibold text-gray-900">
          ${plant.price.toFixed(2)} each
        </p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center space-x-3">
        <div className="flex items-center border border-gray-300 rounded-lg">
          <button
            onClick={decrementQuantity}
            disabled={quantity <= 1}
            className="p-2 text-gray-600 hover:text-emerald-600 disabled:text-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            <Minus className="h-4 w-4" />
          </button>
          
          <span className="px-4 py-2 font-medium text-gray-900 min-w-[3rem] text-center">
            {quantity}
          </span>
          
          <button
            onClick={incrementQuantity}
            className="p-2 text-gray-600 hover:text-emerald-600 transition-colors"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

        {/* Remove Button */}
        <button
          onClick={handleRemove}
          className="p-2 text-gray-400 hover:text-red-600 transition-colors"
          title="Remove from cart"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </div>

      {/* Item Total */}
      <div className="text-right">
        <p className="text-xl font-bold text-gray-900">
          ${(plant.price * quantity).toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default CartItem;