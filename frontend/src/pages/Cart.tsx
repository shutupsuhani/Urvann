import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import CartItem from '../components/cart/CartItem';
import { useCart } from '../context/CartContext';

const Cart: React.FC = () => {
  const { cart, clearCart } = useCart();

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center space-y-8">
            <div className="text-8xl">🛒</div>
            
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
              <p className="text-lg text-gray-600 mb-8">
                Looks like you haven't added any plants to your cart yet.
              </p>
            </div>
            
            <Link
              to="/shop"
              className="inline-flex items-center px-8 py-4 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-all duration-200 transform hover:-translate-y-1 hover:shadow-lg"
            >
              Start Shopping
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
          <p className="text-gray-600">
            {cart.items.length} {cart.items.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Cart Items</h2>
                
                <button
                  onClick={clearCart}
                  className="text-sm text-gray-500 hover:text-red-600 transition-colors"
                >
                  Clear Cart
                </button>
              </div>
              
              <div className="divide-y divide-gray-200">
                {cart.items.map((item) => (
                  <CartItem key={item.plant.id} item={item} />
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({cart.items.reduce((count, item) => count + item.quantity, 0)} items)</span>
                  <span>${cart.total.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-emerald-600 font-medium">Free</span>
                </div>
                
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>Calculated at checkout</span>
                </div>
                
                <hr className="border-gray-200" />
                
                <div className="flex justify-between text-lg font-semibold text-gray-900">
                  <span>Total</span>
                  <span>${cart.total.toFixed(2)}</span>
                </div>
              </div>
              
              <button
                className="w-full py-3 px-6 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-lg flex items-center justify-center space-x-2"
              >
                <ShoppingBag className="h-5 w-5" />
                <span>Proceed to Checkout</span>
              </button>
              
              <Link
                to="/shop"
                className="block text-center text-emerald-600 hover:text-emerald-700 font-medium mt-4 transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart;