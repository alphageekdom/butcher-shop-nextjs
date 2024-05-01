'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [cartUpdateTrigger, setCartUpdateTrigger] = useState(false);

  const { data: session } = useSession();

  // Function to fetch cart data from the server
  const fetchCartData = async () => {
    try {
      if (!isUserAuthenticated()) {
        setCartCount(0);
        setCartItems([]);
        return;
      }

      const res = await fetch('/api/cart', {
        credentials: 'include',
      });

      if (!res.ok) {
        if (res.status === 401) {
          setCartCount(0);
          setCartItems([]);
          return;
        }
        throw new Error('Failed to fetch cart data');
      }

      const data = await res.json();
      const cartItemsData = data.items || [];
      setCartCount(cartItemsData.length);
      setCartItems(cartItemsData);
    } catch (error) {
      console.error('Error fetching cart data:', error);
      toast.error('Failed to fetch cart data');
    }
  };

  const isUserAuthenticated = () => {
    return session && session.user;
  };

  useEffect(() => {
    if (isUserAuthenticated()) {
      fetchCartData();
    }
  }, [session, cartUpdateTrigger]);

  const addItemToCart = async (item) => {
    try {
      // Add item to cart
      const updatedCartItems = [...cartItems, item];
      setCartItems(updatedCartItems);

      const newCartCount = updatedCartItems.length;
      setCartCount(newCartCount);

      setCartUpdateTrigger((prev) => !prev);
    } catch (error) {
      console.error('Error adding item to cart:', error);
      toast.error('Failed to add item to cart');
    }
  };

  const removeItemFromCart = async (itemId) => {
    try {
      // Remove item from cart
      setCartItems(cartItems.filter((item) => item._id !== itemId));

      const res = await fetch('/api/cart', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ itemId }),
        credentials: 'include',
      });

      if (res.ok) {
        setCartUpdateTrigger((prev) => !prev);
        toast.success('Item removed from cart');
      } else {
        throw new Error('Failed to remove item from cart');
      }
    } catch (error) {
      console.error('Error removing item from cart:', error);
      toast.error('Failed to remove item from cart');
    }
  };

  const contextValue = {
    cartCount,
    cartItems,
    addItemToCart,
    removeItemFromCart,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}

export function useGlobalContext() {
  return useContext(CartContext);
}

export default CartContext;
