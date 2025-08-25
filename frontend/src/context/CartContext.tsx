import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Plant, CartItem, Cart } from '../types/Plant';

interface CartContextType {
  cart: Cart;
  addToCart: (plant: Plant, quantity?: number) => void;
  removeFromCart: (plantId: string) => void;
  updateQuantity: (plantId: string, quantity: number) => void;
  clearCart: () => void;
  getCartItemsCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

type CartAction =
  | { type: 'ADD_TO_CART'; payload: { plant: Plant; quantity: number } }
  | { type: 'REMOVE_FROM_CART'; payload: { plantId: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { plantId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: Cart };

const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + (item.plant.price * item.quantity), 0);
};

const cartReducer = (state: Cart, action: CartAction): Cart => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const { plant, quantity } = action.payload;
      const existingItem = state.items.find(item => item.plant.id === plant.id);
      
      let updatedItems: CartItem[];
      if (existingItem) {
        updatedItems = state.items.map(item =>
          item.plant.id === plant.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        updatedItems = [...state.items, { plant, quantity }];
      }
      
      return {
        items: updatedItems,
        total: calculateTotal(updatedItems)
      };
    }

    case 'REMOVE_FROM_CART': {
      const updatedItems = state.items.filter(item => item.plant.id !== action.payload.plantId);
      return {
        items: updatedItems,
        total: calculateTotal(updatedItems)
      };
    }

    case 'UPDATE_QUANTITY': {
      const { plantId, quantity } = action.payload;
      if (quantity <= 0) {
        return cartReducer(state, { type: 'REMOVE_FROM_CART', payload: { plantId } });
      }
      
      const updatedItems = state.items.map(item =>
        item.plant.id === plantId ? { ...item, quantity } : item
      );
      
      return {
        items: updatedItems,
        total: calculateTotal(updatedItems)
      };
    }

    case 'CLEAR_CART':
      return { items: [], total: 0 };

    case 'LOAD_CART':
      return action.payload;

    default:
      return state;
  }
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, { items: [], total: 0 });

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('plant-store-cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        dispatch({ type: 'LOAD_CART', payload: parsedCart });
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('plant-store-cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (plant: Plant, quantity = 1) => {
    dispatch({ type: 'ADD_TO_CART', payload: { plant, quantity } });
  };

  const removeFromCart = (plantId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { plantId } });
  };

  const updateQuantity = (plantId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { plantId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const getCartItemsCount = (): number => {
    return cart.items.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartItemsCount
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};