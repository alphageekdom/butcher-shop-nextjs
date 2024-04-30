'use client';

import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  const updateCartCount = (count) => {
    setCartCount(count);
  };

  const updateCartItems = (items) => {
    setCartItems(items);
  };

  return (
    <CartContext.Provider
      value={{ cartCount, cartItems, updateCartCount, updateCartItems }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useGlobalContext() {
  return useContext(CartContext);
}
