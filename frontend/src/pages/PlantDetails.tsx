import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, CheckCircle, XCircle, Minus, Plus } from 'lucide-react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Loading from '../components/common/Loading';
import ErrorMessage from '../components/common/ErrorMessage';
import { Plant } from '../types/Plant';
import { useCart } from '../context/CartContext';
import { plantService } from '../services/api';
import { PLACEHOLDER_IMAGE } from '../utils/constants';

const PlantDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const [plant, setPlant] = useState<Plant | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);

  const fetchPlant = async () => {
    if (!id) return;
    
    try {
      setLoading(true);
      setError(null);
      const data = await plantService.getPlant(id);
      setPlant(data);
    } catch (err) {
      setError('Failed to load plant details. Please try again.');
      console.error('Error fetching plant:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlant();
  }, [id]);

  const handleAddToCart = async () => {
    if (!plant || !plant.availability) return;
    
    setAddingToCart(true);
    try {
      addToCart(plant, quantity);
      // Reset quantity after adding
      setQuantity(1);
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setAddingToCart(false);
    }
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity(prev => prev > 1 ? prev - 1 : 1);
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <Loading size="lg" text="Loading plant details..." />
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !plant) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <ErrorMessage 
            message={error || 'Plant not found'} 
            onRetry={error ? fetchPlant : undefined} 
          />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back button */}
        <Link
          to="/shop"
          className="inline-flex items-center text-emerald-600 hover:text-emerald-700 transition-colors mb-8"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Shop
        </Link>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Plant Image */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden">
              <img
                src={plant.image || PLACEHOLDER_IMAGE}
                alt={plant.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = PLACEHOLDER_IMAGE;
                }}
              />
            </div>
          </div>

          {/* Plant Details */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{plant.name}</h1>
              
              {/* Categories */}
              <div className="flex flex-wrap gap-2 mb-6">
                {plant.categories.map((category, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-sm font-medium bg-emerald-100 text-emerald-700 rounded-full"
                  >
                    {category}
                  </span>
                ))}
              </div>

              {/* Price */}
              <div className="text-4xl font-bold text-gray-900 mb-6">
                ${plant.price.toFixed(2)}
              </div>

              {/* Availability */}
              <div className="flex items-center space-x-2 mb-8">
                {plant.availability ? (
                  <>
                    <CheckCircle className="h-6 w-6 text-green-500" />
                    <span className="text-lg font-medium text-green-600">In Stock</span>
                  </>
                ) : (
                  <>
                    <XCircle className="h-6 w-6 text-red-500" />
                    <span className="text-lg font-medium text-red-600">Out of Stock</span>
                  </>
                )}
              </div>
            </div>

            

            {/* Add to Cart Section */}
            <div className="border-t border-gray-200 pt-8">
              <div className="flex items-center space-x-6 mb-6">
                <div className="flex items-center">
                  <label htmlFor="quantity" className="text-lg font-medium text-gray-900 mr-4">
                    Quantity:
                  </label>
                  
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={decrementQuantity}
                      disabled={quantity <= 1}
                      className="p-3 text-gray-600 hover:text-emerald-600 disabled:text-gray-300 disabled:cursor-not-allowed transition-colors"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    
                    <span className="px-6 py-3 font-medium text-gray-900 min-w-[4rem] text-center">
                      {quantity}
                    </span>
                    
                    <button
                      onClick={incrementQuantity}
                      className="p-3 text-gray-600 hover:text-emerald-600 transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={!plant.availability || addingToCart}
                className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-200 flex items-center justify-center space-x-3 ${
                  plant.availability
                    ? 'bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-lg transform hover:-translate-y-0.5'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <ShoppingCart className="h-6 w-6" />
                <span>
                  {addingToCart 
                    ? 'Adding to Cart...' 
                    : plant.availability 
                      ? `Add ${quantity} to Cart - $${(plant.price * quantity).toFixed(2)}`
                      : 'Currently Unavailable'
                  }
                </span>
              </button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PlantDetails;