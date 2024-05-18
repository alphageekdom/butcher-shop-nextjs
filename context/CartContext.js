'use client';

import { createContext, useContext, useState } from 'react';
import { toast } from 'react-toastify';

const CartContext = createContext();

export function CartProvider({
  children,
  initialCartCount = 0,
  initialCartItems = [],
}) {
  const [cartCount, setCartCount] = useState(initialCartCount);
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [cartUpdateTrigger, setCartUpdateTrigger] = useState(false);

  const addItemToCart = async (item) => {
    try {
      const res = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ item }),
        credentials: 'include',
      });

      const data = await res.json();
      console.log('CartContext', data);

      if (!res.ok) {
        const errorResponse = await res.json();
        throw new Error(errorResponse.message || 'Failed to add item to cart');
      }

      const updatedCartItems = [...cartItems, item];
      setCartItems(updatedCartItems);
      setCartCount(updatedCartItems.length);
      setCartUpdateTrigger((prev) => !prev);

      toast.success('Item added to cart');
    } catch (error) {
      console.error('Error adding item to cart:', error);
      toast.error('Failed to add item to cart');
    }
  };

  const removeItemFromCart = async (itemId) => {
    try {
      const res = await fetch('/api/cart', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ itemId }),
        credentials: 'include',
      });

      if (!res.ok) {
        throw new Error('Failed to remove item from cart');
      }

      const updatedCartItems = cartItems.filter((item) => item._id !== itemId);
      setCartItems(updatedCartItems);
      setCartCount(updatedCartItems.length);
      setCartUpdateTrigger((prev) => !prev);

      toast.success('Item removed from cart');
    } catch (error) {
      console.error('Error removing item from cart:', error);
      toast.error('Failed to remove item from cart');
    }
  };

  const contextValue = {
    cartCount,
    cartItems,
    setCartItems,
    addItemToCart,
    removeItemFromCart,
    cartUpdateTrigger,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}

export function useGlobalContext() {
  return useContext(CartContext);
}

export default CartContext;
