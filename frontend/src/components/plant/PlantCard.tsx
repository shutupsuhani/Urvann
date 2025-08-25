import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, CheckCircle, XCircle } from 'lucide-react';
import { Plant } from '../../types/Plant';
import { useCart } from '../../context/CartContext';
import { PLACEHOLDER_IMAGE } from '../../utils/constants';

interface PlantCardProps {
  plant: Plant;
  showAddToCart?: boolean;
}

const PlantCard: React.FC<PlantCardProps> = ({ plant, showAddToCart = true }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (plant.availability) {
      addToCart(plant);
    }
  };

  return (
    <Link to={`/plants/${plant.id}`} className="group">
      <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 group-hover:border-emerald-200">
        {/* Image */}
        <div className="aspect-square overflow-hidden bg-gray-100">
          <img
            src={plant.image || PLACEHOLDER_IMAGE}
            alt={plant.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              (e.target as HTMLImageElement).src = PLACEHOLDER_IMAGE;
            }}
          />
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          {/* Name */}
          <h3 className="font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors">
            {plant.name}
          </h3>

          {/* Categories */}
          <div className="flex flex-wrap gap-1">
            {plant.categories.slice(0, 2).map((category, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs font-medium bg-emerald-100 text-emerald-700 rounded-full"
              >
                {category}
              </span>
            ))}
            {plant.categories.length > 2 && (
              <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">
                +{plant.categories.length - 2}
              </span>
            )}
          </div>

          {/* Price and Availability */}
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-gray-900">
              ${plant.price.toFixed(2)}
            </span>
            
            <div className="flex items-center space-x-1 text-sm">
              {plant.availability ? (
                <>
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-green-600 font-medium">In Stock</span>
                </>
              ) : (
                <>
                  <XCircle className="h-4 w-4 text-red-500" />
                  <span className="text-red-600 font-medium">Out of Stock</span>
                </>
              )}
            </div>
          </div>

          {/* Add to Cart Button */}
          {showAddToCart && (
            <button
              onClick={handleAddToCart}
              disabled={!plant.availability}
              className={`w-full py-2 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
                plant.availability
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-md transform hover:-translate-y-0.5'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <ShoppingCart className="h-4 w-4" />
              <span>{plant.availability ? 'Add to Cart' : 'Unavailable'}</span>
            </button>
          )}
        </div>
      </div>
    </Link>
  );
};

export default PlantCard;